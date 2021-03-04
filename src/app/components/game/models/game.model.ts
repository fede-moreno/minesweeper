import { GameStatuses } from '../enums/game-statuses.enum';
import { Board } from '../board/board';

export interface Game {
  status: GameStatuses;
  difficulty: number; //TODO change difficulty
  startDate?: Date;
  endDate: Date; // TODO improvement take into consideration the paused time
  elapsedTime: number;
  board?: Board;
}
