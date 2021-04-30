import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/model/Cell';
import { EntityType } from 'src/model/Entity';

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
    console.log(this.cell)
  }

}
