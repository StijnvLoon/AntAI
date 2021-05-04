import { Injectable } from '@angular/core';
import { Entity } from 'src/model/Entity';
import { Cell, CellType } from '../../model/Cell';
import { Colony } from '../../model/entities/Colony';

@Injectable({
  providedIn: 'root'
})
export class ColonyService {

  colony: Colony

  constructor() { }

  replaceCell(y: number, x: number, replacementCellType: CellType) {
    const oldCell: Cell = this.colony.grid.getCellAt(y, x)

    if(oldCell.entity) {
      oldCell.entity.kill()
    }

    this.colony.grid.cellsMap.set(
      y + '-' + x, 
      this.colony.grid.createCellByType(y, x, replacementCellType))
  }
}
