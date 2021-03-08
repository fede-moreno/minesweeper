import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings.model';
import { CookieService } from 'ngx-cookie-service';
import { EASY_SETTINGS } from '../consts/predifined-settings.const';

@Injectable({
  providedIn: 'root',
})
export class SettingsStateService {
  // tslint:disable-next-line:variable-name
  private readonly _state = new BehaviorSubject<Settings>(EASY_SETTINGS);
  readonly states$ = this._state.asObservable();
  readonly cookieName = 'mspSettings'; // Could be stored in config.json

  constructor(private cookieService: CookieService) {
    this.loadFromCookie();
  }

  /**
   * Retrieves and returns the current state of the stored settings.
   * @return current settings state.
   */
  get state(): Settings {
    return this._state.getValue();
  }

  /**
   * Checks if the cookie exists and if so, it retrieves the saved settings.
   */
  loadFromCookie(): void {
    const cookieExists: boolean = this.cookieService.check(this.cookieName);
    if (cookieExists) {
      const cookieValue: Settings = JSON.parse(this.cookieService.get(this.cookieName));
      this._state.next(cookieValue);
    }
  }

  /**
   * Updates the observable with the new changes and lets the observers know.
   * The changes are also stored in the cookie.
   * @param state - new settings to be saved into the store and cookie.
   *
   */
  update(state: Settings): void {
    this._state.next(state);
    this.cookieService.set(this.cookieName, JSON.stringify(state));
  }
}
