import { Component, OnInit } from '@angular/core';
import { AppPages } from '../../enums/app-pages.enum';
import { Router } from '@angular/router';
import { LocalstorageKeys } from '../../enums/localstorage-keys.enum';
import { Game } from '../game/models/game.model';
import { Difficulty } from '../../enums/difficulty.enum';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.scss']
})
export class SavedGamesComponent implements OnInit {
  games?: Game[];
  DifficultyEnum = Difficulty;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.games = JSON.parse(<string> localStorage.getItem(LocalstorageKeys.SAVED_GAMES));
    if (this.games && this.games.length > 1) {
      // Sorted by new
      this.games.reverse();
    }
  }

  /**
   * Bring us to our game page with the selected game to be resumed by sending the game data as navigation state
   * @param game Game to be resumed
   */
  loadGame(game: Game): void {
    this.router.navigate([AppPages.GAME], { state: game })
  }

  /**
   * Deletes the game from the games list, then saves the game list in localStorage in its original order
   * @param gameIndex index of the game to delete
   */
  eraseGame(gameIndex: number): void {
    if (this.games) {
      this.games.splice(gameIndex, 1);
      const aux = cloneDeep(this.games).reverse();
      localStorage.setItem(LocalstorageKeys.SAVED_GAMES, JSON.stringify(aux));
    }
  }

  /**
   * Navigates back to home page
   */
  goHome(): void {
    this.router.navigate([AppPages.HOME]);
  }
}
