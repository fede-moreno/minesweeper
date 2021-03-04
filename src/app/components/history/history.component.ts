import { Component, OnInit } from '@angular/core';
import { Game } from '../game/models/game.model';
import { LocalstorageKeys } from '../../enums/localstorage-keys.enum';
import { GameStatuses } from '../game/enums/game-statuses.enum';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  games?: Game[];
  GameStatusesEnum = GameStatuses;

  constructor() { }
  ngOnInit(): void {
    this.games = JSON.parse(<string> localStorage.getItem(LocalstorageKeys.HISTORY));
    if (this.games && this.games.length > 1) {
      // Sorted by Difficulty and Elapsed time ascending
      this.games.sort((a,b) => a.difficulty - b.difficulty || a.elapsedTime - b.elapsedTime)
    }
  }

  clearHistory(): void {
    localStorage.removeItem(LocalstorageKeys.HISTORY);
  }

}
