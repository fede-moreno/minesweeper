import { Settings } from '../models/settings.model';
import { Difficulty } from '../enums/difficulty.enum';

export const EASY_SETTINGS: Settings = {
  boardWidth: 8,
  boardHeight: 8,
  difficulty: Difficulty.EASY,
  minesQuantity: 10
};

export const MEDIUM_SETTINGS: Settings = {
  boardWidth: 16,
  boardHeight: 16,
  difficulty: Difficulty.MEDIUM,
  minesQuantity: 40
};

export const HARD_SETTINGS: Settings = {
  boardWidth: 30,
  boardHeight: 16,
  difficulty: Difficulty.HARD,
  minesQuantity: 99
};

