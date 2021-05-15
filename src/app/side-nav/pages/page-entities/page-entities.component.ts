import { Component, OnInit } from '@angular/core';
import { Cell, CellType } from 'src/model/Cell';
import { BlockadeCell } from 'src/model/cells/BlockadeCell';
import { FoodCell } from 'src/model/cells/FoodCell';
import { Ant, AntType } from 'src/model/entities/Ant';
import { GathererAnt } from 'src/model/entities/ants/GathererAnt';
import { Colony } from 'src/model/entities/Colony';
import { Enemy } from 'src/model/entities/Enemy';
import { Grid } from 'src/model/Grid';
import { GlobalVars } from 'src/utils/GlobalVars';


@Component({
  selector: 'app-page-entities',
  templateUrl: './page-entities.component.html',
  styleUrls: ['./page-entities.component.scss', '../pages.scss']
})
export class PageEntitiesComponent implements OnInit {

  cell1: Cell = new Cell(0,0, CellType.EMPTY, undefined, undefined)
  cell2: Cell = new Cell(0,0, CellType.EMPTY, undefined, undefined)
  cell3: Cell = new Cell(0,0, CellType.EMPTY, undefined, undefined)



  globalvars = GlobalVars
  constructor() { 
    this.cell1.entity = new Colony(new Grid(3,3,0,0,0), new Map(), 0);
    this.cell2.entity = new Enemy(this.cell2);
    this.cell3.entity = new Ant(AntType.GATHERER, this.cell3, this.cell1.entity.currentCell, () => {

    }, 1 );
  }

  ngOnInit(): void {
  }

}
