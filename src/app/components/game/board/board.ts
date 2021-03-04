import { Tile } from '../tile/tile';
import { TileStatuses } from '../enums/tile-statuses.enum';
import { NEIGHBOR_TILES } from '../consts/neighbor-tiles.const';
import { GameStatuses } from '../enums/game-statuses.enum';

export class Board {
  tiles: Tile[][] = [];
  undiscoveredTilesToWin: number;
  minesToFlag = 0;

  //  Column x, Row y
  constructor(width: number, height: number, minesQuantity: number) {
    for (let y = 0; y < height; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < width; x++) {
        this.tiles[y][x] = new Tile(x, y);
      }
    }
    this.undiscoveredTilesToWin = (width * height) - minesQuantity;
    this.minesToFlag = minesQuantity;
    this.setMines(minesQuantity);
    this.calculateProximity(width, height);

  }


  setMines(minesQuantity: number): void {
    // TODO Improve edge cases for small boards
    for (let mine = 0; mine < minesQuantity; mine++) {
      const randomY: number = Math.floor(this.tiles.length * Math.random());
      const randomX: number = Math.floor(this.tiles[randomY].length * Math.random());
      this.tiles[randomY][randomX].hasMine = true;
    }
  }

  calculateProximity(width: number, height: number): void  {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let neighborMines = 0;
        NEIGHBOR_TILES.forEach((neighbor) => {
          const dyColumn = this.tiles[y + neighbor[0]];
          if (
            dyColumn &&
            dyColumn[x + neighbor[1]] &&
            dyColumn[x + neighbor[1]].hasMine
          ) {
            neighborMines++;
          }
          this.tiles[y][x].neighborMines = neighborMines;
        });
      }
    }
  }


  revealTile(tile: Tile): GameStatuses {
    if (tile.status === TileStatuses.OPEN) {
      if (tile.hasMine) {
        this.revealAllMines();
        tile.status = TileStatuses.EXPLODED;
        return GameStatuses.GAME_OVER;
      } else {
        tile.status = TileStatuses.CLEAR;
        if (tile.neighborMines === 0) {
          this.revealNeighbors(tile);
        }
        if (this.undiscoveredTilesToWin-- <= 1) {
          return GameStatuses.WON;
        }
      }
    }
    return GameStatuses.UNDERWAY;
  }

  revealNeighbors(tile: Tile): void {
    NEIGHBOR_TILES.forEach((neighbor) => {
      const dyColumn = this.tiles[tile.y + neighbor[0]];
      if (dyColumn && dyColumn[tile.x + neighbor[1]]) {
        this.revealTile(this.tiles[tile.y + neighbor[0]][tile.x + neighbor[1]]);
      }
    });
  }

  revealAllMines(): void {
    for (const row of this.tiles) {
      for (const tile of row) {
        if (tile.hasMine) {
          tile.status = TileStatuses.CLEAR;
        }
      }
    }
  }

  flagTile(tile: Tile): void {
    if (tile.status === TileStatuses.OPEN) {
      this.minesToFlag--;
      tile.status = TileStatuses.FLAGGED;
    } else if (tile.status === TileStatuses.FLAGGED) {
      tile.status = TileStatuses.OPEN;
      this.minesToFlag++;
    }
  }
}
