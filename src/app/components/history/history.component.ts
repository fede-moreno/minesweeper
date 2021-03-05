import { Component, OnInit } from '@angular/core';
import { Game } from '../game/models/game.model';
import { LocalstorageKeys } from '../../enums/localstorage-keys.enum';
import { GameStatuses } from '../game/enums/game-statuses.enum';
import { AppPages } from '../../enums/app-pages.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  games?: Game[];
  GameStatusesEnum = GameStatuses;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.games = JSON.parse(<string> localStorage.getItem(LocalstorageKeys.HISTORY));
    if (this.games && this.games.length > 1) {
      // Sorted by Difficulty and Elapsed time ascending
      this.games.sort((a,b) => a.difficulty - b.difficulty || a.elapsedTime - b.elapsedTime)
    }
  }

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
