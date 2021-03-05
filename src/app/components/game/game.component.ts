import { Component, OnInit } from '@angular/core';
import { Board } from './board/board';
import { TileStatuses } from './enums/tile-statuses.enum';
import { Tile } from './tile/tile';
import { GameStatuses } from './enums/game-statuses.enum';
import { interval, Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Game } from './models/game.model';
import { LocalstorageKeys } from '../../enums/localstorage-keys.enum';
import { SettingsStateService } from '../../services/settings-state.service';
import { Settings } from '../../models/settings.model';
import { AppPages } from '../../enums/app-pages.enum';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  board: Board;
  TileStatusesEnum = TileStatuses;
  gameStatus: GameStatuses = GameStatuses.NEW;
  GameStatusesEnum = GameStatuses;
  startDate?: Date;
  countDownSubscription: Subscription | undefined;
  secondsUnderway = 0;
  showGameSavedMessage = false;
  readonly boredImgSrc = '../../assets/images/bored.jpg';
  readonly sadImgSrc = '../../assets/images/sad.jpg';
  readonly happyImgSrc = '../../assets/images/happy.jpg';

  constructor(private settingsStateService: SettingsStateService, private router: Router) {
    this.board = this.startNewGame();
  }

  ngOnInit(): void {

  }

  private startNewGame(): Board {
    const settings: Settings = this.settingsStateService.state;
    this.gameStatus = GameStatuses.NEW;
    return new Board(settings.boardWidth, settings.boardHeight, settings.minesQuantity);
  }

  handleTileClick(tile: Tile): void {
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
    return Math.floor((new Date().getTime() - startDate.getTime()) / 1000);
  }

  private stopTimer(): void {
    this.countDownSubscription?.unsubscribe();
  }

  handleTileRightClick(event: MouseEvent, tile: Tile): void {
    event.preventDefault();
    if (this.gameStatus === GameStatuses.UNDERWAY) {
      this.board.flagTile(tile);
    }
  }

  restartGame(): void {
    this.stopTimer();
    this.board = this.startNewGame();
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
      difficulty: this.settingsStateService.state.difficulty,
      status: this.gameStatus,
      startDate: this.startDate,
      endDate: new Date(),
      elapsedTime: this.secondsUnderway,
      board: saveType === LocalstorageKeys.SAVED_GAMES ? this.board : undefined
    };
    localStorage.setItem(saveType, games ? JSON.stringify([...games, currentGame]) : JSON.stringify([currentGame]));
  }

  /**
   * Navigates back to home page
   */
  goHome(): void {
    this.router.navigate([AppPages.HOME]);
  }
}
