import { Component, OnInit } from '@angular/core';
import { Game } from '../game/models/game.model';
import { LocalstorageKeys } from '../../enums/localstorage-keys.enum';
import { GameStatuses } from '../game/enums/game-statuses.enum';
import { AppPages } from '../../enums/app-pages.enum';
import { Router } from '@angular/router';
import { Difficulty } from '../../enums/difficulty.enum';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  games?: Game[];
  GameStatusesEnum = GameStatuses;
  DifficultyEnum = Difficulty;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.games = JSON.parse(localStorage.getItem(LocalstorageKeys.HISTORY) as string);
    if (this.games && this.games.length > 1) {
      // Sorted by Difficulty and Elapsed time ascending
      this.games.sort((a, b) => a.difficulty - b.difficulty || a.elapsedTime - b.elapsedTime);
    }
  }

  /**
   *  Clears past games (history) from localstorage
   */
  clearHistory(): void {
    localStorage.removeItem(LocalstorageKeys.HISTORY);
    this.games = [];
  }

  /**
   * Navigates back to home page
   */
  goHome(): void {
    this.router.navigate([AppPages.HOME]);
  }
}
