import { Component, Input, OnInit } from '@angular/core';
import { PageKeeper } from '../side-nav.component';

@Component({
  selector: 'app-page-handler',
  templateUrl: './page-handler.component.html',
  styleUrls: ['./page-handler.component.scss']
})
export class PageHandlerComponent implements OnInit {

  @Input() pageKeeper: PageKeeper

  constructor() {

  }

  ngOnInit(): void {

  }

}
