import { Component, OnInit } from '@angular/core';
import { Board } from './models/board.model';
import { TileStatuses } from './enums/tile-statuses.enum';
import { Tile } from './models/tile.model';
import { GameStatuses } from './enums/game-statuses.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  board: Board;
  TileStatusesEnum = TileStatuses;
  gameStatus: GameStatuses;


  constructor() {
    this.board = new Board(15, 8, 6);
    this.gameStatus = GameStatuses.NEW;
  }

  ngOnInit(): void {
  }

  handleTileClick(tile: Tile) {
    if (this.gameStatus === GameStatuses.NEW || this.gameStatus === GameStatuses.UNDERWAY) {
      const gameStatus: GameStatuses = this.board.revealTile(tile);
      switch (gameStatus) {
        case GameStatuses.UNDERWAY:
          break;
        case GameStatuses.GAME_OVER:
          alert('game over');
          break;
        case GameStatuses.WON:
          alert('you win');
      }
      this.gameStatus = gameStatus;
    }
  }

  handleTileRightClick(event: MouseEvent, tile: Tile) {
    event.preventDefault();
    this.board.flagTile(tile);
  }

  restartGame(): void {
    this.board = new Board(15, 8, 5);
    this.gameStatus = GameStatuses.NEW;
  }
}
