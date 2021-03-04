import { Component, OnInit } from '@angular/core';
import { Board } from './board/board';
import { TileStatuses } from './enums/tile-statuses.enum';
import { Tile } from './tile/tile';
import { GameStatuses } from './enums/game-statuses.enum';
import { interval, Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Game } from './models/game.model';
import { LocalstorageKeys } from '../../enums/localstorage-keys.enum';

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
  startDate?: Date;
  countDownSubscription: Subscription | undefined;
  secondsUnderway = 0;
  showGameSavedMessage = false;

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
      this.gameStatus = gameStatus;
      if (gameStatus === GameStatuses.GAME_OVER || gameStatus === GameStatuses.WON) {
        this.stopTimer();
        this.saveToLocalStorage(LocalstorageKeys.HISTORY);
      }
    }
  }

  private startTimer(): void {
    this.startDate = new Date();
    this.countDownSubscription = interval(1000).pipe(untilDestroyed(this)).subscribe(() => {
      // @ts-ignore
      this.secondsUnderway = this.getElapsedTimeInSeconds(this.startDate);
    });
  }

  private getElapsedTimeInSeconds(startDate: Date): number {
    return Math.floor((new Date().getTime() - startDate.getTime()) / 1000)
  }

  private stopTimer(): void {
    this.countDownSubscription?.unsubscribe();
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

  saveGame(): void {
    this.showGameSavedMessage = true;
    this.gameStatus = GameStatuses.SAVING;
    this.saveToLocalStorage(LocalstorageKeys.SAVED_GAMES);

    setTimeout(() => { // Fakes saving time
      this.showGameSavedMessage = false;
      this.gameStatus = GameStatuses.UNDERWAY;
    }, 3000);
  }

  private saveToLocalStorage(saveType: LocalstorageKeys): void {
    const games: Game[] = JSON.parse(<string> localStorage.getItem(saveType));
    const currentGame: Game = {
      difficulty: 3,
      status: this.gameStatus,
      startDate: this.startDate,
      endDate: new Date(),
      elapsedTime: this.secondsUnderway,
      board: saveType === LocalstorageKeys.SAVED_GAMES ? this.board : undefined
    };
    localStorage.setItem(saveType, games ? JSON.stringify([...games, currentGame]) : JSON.stringify([currentGame]));
  }
}
