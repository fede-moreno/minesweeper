import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsStateService } from '../../services/settings-state.service';
import { HARD_SETTINGS } from '../../consts/predifined-settings.const';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{
        provide: SettingsStateService,
        useValue: {
          state: HARD_SETTINGS
        }
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check the form is initialized with the store settings', () => {
    const hostElement = fixture.nativeElement;
    expect(hostElement.querySelector('#boardWidth').value).toEqual(HARD_SETTINGS.boardWidth.toString());
    expect(hostElement.querySelector('#boardHeight').value).toEqual(HARD_SETTINGS.boardHeight.toString());
    expect(hostElement.querySelector('#minesQuantity').value).toEqual(HARD_SETTINGS.minesQuantity.toString());
  });
});
