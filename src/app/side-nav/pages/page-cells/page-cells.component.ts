import { Component, OnInit } from '@angular/core';
import { Cell, CellType } from 'src/model/Cell';
import { BlockadeCell } from 'src/model/cells/BlockadeCell';
import { FoodCell } from 'src/model/cells/FoodCell';
import { GlobalVars } from 'src/utils/GlobalVars';
@Component({
  selector: 'app-page-cells',
  templateUrl: './page-cells.component.html',
  styleUrls: ['./page-cells.component.scss', '../pages.scss']
})
export class PageCellsComponent implements OnInit {

  cell1: Cell = new Cell(0,0, CellType.EMPTY, undefined, undefined)
  cell2: FoodCell = new FoodCell(0,1)
  cell3: BlockadeCell = new BlockadeCell(1,1)
  cell4: Cell = new Cell(1,0, CellType.EMPTY, undefined, undefined)

  globalvars = GlobalVars

  constructor() {
  }

  ngOnInit(): void {
  }

}
