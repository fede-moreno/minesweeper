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
import { Difficulty } from '../../enums/difficulty.enum';

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
  previousSeconds = 0;
  showGameSavedMessage = false;
  gameDifficulty: Difficulty;

  readonly boredImgSrc = '../../assets/images/bored.jpg';
  readonly sadImgSrc = '../../assets/images/sad.jpg';
  readonly happyImgSrc = '../../assets/images/happy.jpg';

  constructor(private settingsStateService: SettingsStateService, private router: Router) {
    if (this.router.getCurrentNavigation()?.extras?.state) {
      // @ts-ignore
      const state: Game = this.router.getCurrentNavigation().extras.state;
      // @ts-ignore
      this.board = new Board(0, 0, 0, state.board); // This could be improved by using a service
      this.gameDifficulty = state.difficulty;
      this.previousSeconds = state.elapsedTime;
      this.gameStatus = GameStatuses.SAVED;
    } else {
      this.board = this.startNewGame();
      this.gameDifficulty = this.settingsStateService.state.difficulty;
    }
  }

  ngOnInit(): void {

  }


  private startNewGame(): Board {
    const settings: Settings = this.settingsStateService.state;
    this.gameStatus = GameStatuses.NEW;
    return new Board(settings.boardWidth, settings.boardHeight, settings.minesQuantity);
  }

  handleTileClick(tile: Tile): void {
    if (this.gameStatus === GameStatuses.NEW || this.gameStatus === GameStatuses.UNDERWAY || this.gameStatus === GameStatuses.SAVED) {
      // Starts the timer for every new game
      if (this.gameStatus === GameStatuses.NEW || this.gameStatus === GameStatuses.SAVED) {
        this.startTimer();
      }

      // Reveals the tile and gets the new status
      const newGameStatus: GameStatuses = this.board.revealTile(tile);
      this.gameStatus = newGameStatus;
      if (newGameStatus === GameStatuses.GAME_OVER || newGameStatus === GameStatuses.WON) {
        this.stopTimer();
        this.saveToLocalStorage(LocalstorageKeys.HISTORY);
      }
    }
  }

  private startTimer(): void {
    this.startDate = new Date();
    this.countDownSubscription = interval(1000).pipe(untilDestroyed(this)).subscribe(() => {
      // @ts-ignore
      this.secondsUnderway = this.getElapsedTimeInSeconds(this.startDate) + this.previousSeconds;
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
    this.previousSeconds = 0;
    this.secondsUnderway = 0;
  }

  /**
   * Displays saving message for 3seconds, sets the game status to SAVING so the user can't interact with the board
   * saves the elapsed time (seconds), stores the game to localstorage and finally sets the game status to SAVED.
   */
  saveGame(): void {
    this.showGameSavedMessage = true;
    this.gameStatus = GameStatuses.SAVING;
    this.previousSeconds = this.secondsUnderway;
    this.stopTimer();
    this.saveToLocalStorage(LocalstorageKeys.SAVED_GAMES);

    setTimeout(() => { // Fakes saving time
      this.showGameSavedMessage = false;
      this.gameStatus = GameStatuses.SAVED;
    }, 3000);
  }

  private saveToLocalStorage(saveType: LocalstorageKeys): void {
    const games: Game[] = JSON.parse(localStorage.getItem(saveType) as string);
    const currentGame: Game = {
      difficulty: this.gameDifficulty,
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
