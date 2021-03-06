import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cell, CellType } from 'src/model/Cell';
import { FoodCell } from 'src/model/cells/FoodCell';
import { EntityType } from 'src/model/Entity';
import { CustomMath } from 'src/utils/CustomMath';
import { VerboseMode } from 'src/utils/VerboseMode';
import { CellDialog } from 'src/app/dialogs/cellDialog/Cell.dialog';
import { Ant, AntType } from 'src/model/entities/Ant';
import { GlobalVars } from 'src/utils/GlobalVars';

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

  getCellStyle() {
    var background_settings = "";

    switch (this.cell.type) {
      case CellType.EMPTY: {
        //calculate the darkness of a cell based on the cell cost.
        var cellcost_percentage = (this.cell.costs / GlobalVars.CELL_COSTS) * 100; //get relative cost percentage 
        var calculated_darkness = CustomMath.clamp(cellcost_percentage, 1, 100); //calculate darkness of cell/tile
        background_settings = `hsl(200, 20%, ${calculated_darkness}%)` //store colouring in background setting 
        break;
      }

      case CellType.BLOCKADE: {
        return { 'background-color': '#c78a42' } //blockade cannot be traversed, thus cell costs do not matter
      }

      case CellType.FOOD: {
        const foodType: FoodCell = this.cell as FoodCell
        if (foodType.foodAmount > 0) {
          var food_storage_percentage = (foodType.foodAmount / foodType.maxfoodamount) * 100; //calculate food storage percentage
          var calculated_lightness = CustomMath.clamp(100 - food_storage_percentage, 30, 50); //calculate lightness of cell/tile
          background_settings = `hsl(136,100%,${calculated_lightness}%)`; //overwrite previously defined background setting --> from empty cell
        }
        break;
      }
    }
    return { 'background-color': background_settings }; //append background settings
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
