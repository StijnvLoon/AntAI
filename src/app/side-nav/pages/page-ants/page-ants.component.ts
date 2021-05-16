import { Component, OnInit } from '@angular/core';
import { Cell, CellType } from 'src/model/Cell';
import { BlockadeCell } from 'src/model/cells/BlockadeCell';
import { FoodCell } from 'src/model/cells/FoodCell';
import { Ant, AntType } from 'src/model/entities/Ant';
import { CaretakerAnt } from 'src/model/entities/ants/CaretakerAnt';
import { GathererAnt } from 'src/model/entities/ants/GathererAnt';
import { SoldierAnt } from 'src/model/entities/ants/SoldierAnt';
import { Colony } from 'src/model/entities/Colony';
import { Enemy } from 'src/model/entities/Enemy';
import { Grid } from 'src/model/Grid';
import { GlobalVars } from 'src/utils/GlobalVars';

@Component({
  selector: 'app-page-ants',
  templateUrl: './page-ants.component.html',
  styleUrls: ['./page-ants.component.scss', '../pages.scss']
})
export class PageAntsComponent implements OnInit {
  cell1: Cell = new Cell(0,0, CellType.EMPTY, undefined, undefined)
  cell2: Cell = new Cell(0,0, CellType.EMPTY, undefined, undefined)
  cell3: Cell = new Cell(0,0, CellType.EMPTY, undefined, undefined)

  globalvars = GlobalVars

  constructor() {
    this.cell1.entity = new GathererAnt(this.cell1, this.cell1, () => {});
    this.cell2.entity = new SoldierAnt(this.cell2, this.cell2, () => {});
    this.cell3.entity = new CaretakerAnt(this.cell3, this.cell3, () => {});

   }

  ngOnInit(): void {
  }

}
