import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/model/Entity';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {

  @Input() entity: Entity

  constructor() { }

  ngOnInit(): void {
  }

}
