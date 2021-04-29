import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/model/Cell';

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
    if(this.cell.entity) {
      switch (this.cell.entity.name) {
        case "Ant":
          return { 'background-color': 'black' }
        case "Food":
          return { 'background-color': 'green' }
        case "Enemy":
          return { 'background-color': 'red' }
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
