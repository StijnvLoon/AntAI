import { Component, Input, OnInit } from '@angular/core';
import { Ant } from 'src/model/entities/Ant';

@Component({
  selector: 'app-ant',
  templateUrl: './ant.component.html',
  styleUrls: ['./ant.component.scss']
})
export class AntComponent implements OnInit {

  @Input() ant: Ant

  constructor() { }

  ngOnInit(): void {
  }

}
