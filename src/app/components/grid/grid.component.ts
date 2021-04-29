import { Component, Input, OnInit } from '@angular/core';
import { Grid } from 'src/model/Grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() grid: Grid

  constructor() { }

  ngOnInit(): void {
  }

}
