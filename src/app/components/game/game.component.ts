import { Component, OnInit } from '@angular/core';
import { Board } from './board/board';
import { TileStatuses } from './enums/tile-statuses.enum';
import { Tile } from './tile/tile';
import { GameStatuses } from './enums/game-statuses.enum';
import { interval, Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  board: Board;
  TileStatusesEnum = TileStatuses;
  gameStatus: GameStatuses;
  GameStatusesEnum = GameStatuses;
  startDate: Date | undefined;
  countDownSubscription: Subscription | undefined;
  secondsUnderway = 0;
  readonly boredImgSrc = '../../assets/images/bored.jpg';
  readonly sadImgSrc = '../../assets/images/sad.jpg';
  readonly happyImgSrc = '../../assets/images/happy.jpg';


  constructor() {
    this.board = new Board(15, 8, 8);
    this.gameStatus = GameStatuses.NEW;
  }

  ngOnInit(): void {
  }

  handleTileClick(tile: Tile) {
    if (this.gameStatus === GameStatuses.NEW || this.gameStatus === GameStatuses.UNDERWAY) {
      // Starts the timer for every new game
      if (this.gameStatus === GameStatuses.NEW) {
        this.startTimer();
      }
      // Reveals the tile and gets the new status
      const gameStatus: GameStatuses = this.board.revealTile(tile);
      if (gameStatus === GameStatuses.GAME_OVER || gameStatus === GameStatuses.WON) {
        this.handleGameEnd(gameStatus);
      }
      this.gameStatus = gameStatus;
    }
  }

  startTimer(): void {
    this.startDate = new Date();
    this.countDownSubscription = interval(1000).pipe(untilDestroyed(this)).subscribe(() => {
      // @ts-ignore
      this.secondsUnderway = Math.floor((new Date().getTime() - this.startDate.getTime()) / 1000);
    });
  }

  stopTimer(): void {
    this.countDownSubscription?.unsubscribe();
  }

  handleGameEnd(gameStatus: GameStatuses): void {
    this.stopTimer();
  }

  handleTileRightClick(event: MouseEvent, tile: Tile) {
    event.preventDefault();
    this.board.flagTile(tile);
  }

  restartGame(): void {
    this.stopTimer();
    this.secondsUnderway = 0;
    this.board = new Board(8, 8, 12);
    this.gameStatus = GameStatuses.NEW;
  }
}
