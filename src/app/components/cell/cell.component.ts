import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/model/Cell';
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

  getStyle() {
    if (!this.cell.entity) {
      if (this.cell.foodamount > 0) {
      // return {'background-color' : 'hsl(136,100%,50%)'}
      var food_storage_percentage = (this.cell.foodamount / this.cell.maxfoodamount) * 100;
      var calculated_lightness = CustomMath.clamp(100 - food_storage_percentage, 30, 100); 
      //var calculated_lightness = CustomMath.clamp(100 - CustomMath.clamp(this.cell.foodamount, 0,100),50,100);
        return { 'background-color' : `hsl(136,100%,${calculated_lightness}%)`};
      // return { 'background-color' : 'green', 'opacity' : CustomMath.clamp(this.cell.foodamount, 0.1, 1)/10}
      }
    }
    if (this.cell.entity) {
      switch (this.cell.entity.type) {
        case EntityType.ANT:
          return { 'background-color': 'black' }
        case EntityType.FOOD:
          return { 'background-color': 'green' }
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

  log() {
    if (VerboseMode.verbose) console.log(this.cell)
  }

}
