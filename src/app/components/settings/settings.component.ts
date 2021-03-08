import { Component, OnInit } from '@angular/core';
import { SettingsStateService } from '../../services/settings-state.service';
import { Difficulty } from '../../enums/difficulty.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppPages } from '../../enums/app-pages.enum';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EASY_SETTINGS, HARD_SETTINGS, MEDIUM_SETTINGS } from '../../consts/predifined-settings.const';

@UntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  DifficultyEnum = Difficulty;
  settingsFormGroup: FormGroup;

  constructor(private router: Router, private settingsStateService: SettingsStateService) {
    this.settingsFormGroup = new FormGroup({
      difficulty: new FormControl(1, [Validators.required]),
      boardWidth: new FormControl(null, [Validators.required, Validators.min(4), Validators.max(100)]),
      boardHeight: new FormControl(null, [Validators.required, Validators.min(4), Validators.max(100)]),
      minesQuantity: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(200)])
    });
  }

  ngOnInit(): void {
    this.settingsFormGroup.patchValue(this.settingsStateService.state);
    this.settingsFormGroup.controls.difficulty.valueChanges.pipe(untilDestroyed(this)).subscribe((value: string) => {
      switch (+value) {
        case Difficulty.EASY:
          this.settingsFormGroup.patchValue(EASY_SETTINGS, {emitEvent: false});
          break;
        case Difficulty.MEDIUM:
          this.settingsFormGroup.patchValue(MEDIUM_SETTINGS, {emitEvent: false});
          break;
        case Difficulty.HARD:
          this.settingsFormGroup.patchValue(HARD_SETTINGS, {emitEvent: false});
          break;
        // Here we could set up initial/predefined settings for custom difficulty
      }
    });
  }

  /**
   * Navigates back to home page
   */
  goHome(): void {
    this.router.navigate([AppPages.HOME]);
  }

  /**
   * Saves settings into the store (SettingsStateService) and navigates to the home page.
   */
  saveSettings(): void {
    this.settingsStateService.update(this.settingsFormGroup.value);
    this.goHome();
    // TODO show snackbar with success message
  }

}
