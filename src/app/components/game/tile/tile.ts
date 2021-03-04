import { TileStatuses } from '../enums/tile-statuses.enum';

export class Tile {
  status: TileStatuses = TileStatuses.OPEN;
  hasMine = false;
  neighborMines = 0;

  constructor(public x: number, public y: number) {}
}
