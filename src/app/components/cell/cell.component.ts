import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cell, CellType } from 'src/model/Cell';
import { FoodCell } from 'src/model/cells/FoodCell';
import { EntityType } from 'src/model/Entity';
import { CustomMath } from 'src/utils/CustomMath';
import { VerboseMode } from 'src/utils/VerboseMode';
import { CellDialog } from 'src/app/dialogs/cellDialog/Cell.dialog';
import { Ant, AntType } from 'src/model/entities/Ant';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getEntityStyle() {
    if (this.cell.entity) {
      switch (this.cell.entity.entityType) {
        case EntityType.ANT:
          return { 'background-color': 'black' }
        case EntityType.ENEMY:
          return { 'background-color': 'red' }
        case EntityType.COLONY:
          return { 'background-color': 'yellow' }
        default:
          return {}
      }
    } else {
      return {}
    }
  }

  getCellStyle() {
    switch (this.cell.type) {
      case CellType.EMPTY:
        return { 'background-color': 'white' }
      case CellType.BLOCKADE:
        return { 'background-color': '#b26b14' }
      case CellType.FOOD:
        const foodType: FoodCell = this.cell as FoodCell

        if (foodType.foodAmount > 0) {
          var food_storage_percentage = (foodType.foodAmount / foodType.maxfoodamount) * 100;
          var calculated_lightness = CustomMath.clamp(100 - food_storage_percentage, 30, 50);
          return { 'background-color': `hsl(136,100%,${calculated_lightness}%)` };
        }
      default:
        return {}
    }
  }

  getAntStyle() {
    if (this.cell.entity) {
      if(this.cell.entity.entityType == EntityType.ANT) {
        const ant = this.cell.entity as Ant

        switch(ant.antType) {
          case AntType.GATHERER: {
            return { 'background-color': 'green' }
          }
          case AntType.SOLDIER: {
            return { 'background-color': 'red' }
          }
        }
      }
    } else {
      return {}
    }
  }

  log() {
    if (VerboseMode.verbose) console.log(this.cell)
  }

  editCellDialog() {
    console.log(this.cell)
    const dialogRef = this.dialog.open(CellDialog, {
      maxWidth: '800px',
      width: '80%',
      data: {
        y: this.cell.y,
        x: this.cell.x,
        startCellType: this.cell.type
      }
    })
  }

}
