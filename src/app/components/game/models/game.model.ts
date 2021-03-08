import { GameStatuses } from '../enums/game-statuses.enum';
import { Board } from '../board/board';
import { Difficulty } from '../../../enums/difficulty.enum';

export interface Game {
  status: GameStatuses;
  difficulty: Difficulty;
  startDate?: Date;
  endDate: Date;
  elapsedTime: number;
  board?: Board;
}
