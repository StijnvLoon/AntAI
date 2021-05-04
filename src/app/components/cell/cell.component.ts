import { Component, Input, OnInit } from '@angular/core';
import { Cell, CellType } from 'src/model/Cell';
import { FoodCell } from 'src/model/cells/FoodCell';
import { EntityType } from 'src/model/Entity';
import { CustomMath } from 'src/utils/CustomMath';
import { VerboseMode } from 'src/utils/VerboseMode';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell

  constructor() { }

  ngOnInit(): void {
  }

  getEntityStyle() {
    if (this.cell.entity) {
      switch (this.cell.entity.type) {
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

  log() {
    if (VerboseMode.verbose) console.log(this.cell)
  }

}
