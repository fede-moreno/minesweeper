import { Difficulty } from '../enums/difficulty.enum';

export interface Settings {
  boardWidth: number;
  boardHeight: number;
  minesQuantity: number;
  difficulty: Difficulty;
}
