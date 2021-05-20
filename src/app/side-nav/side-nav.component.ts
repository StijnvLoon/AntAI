import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

  pageKeeper: PageKeeper = new PageKeeper()

  constructor() { }

  ngOnInit(): void {
  }
}

export class PageKeeper {

  currentPage: number = 1
  readonly pageAmount: number = 5

  nextPage() {
    if(this.currentPage < this.pageAmount) {
      this.currentPage += 1
    }
  }

  previousPage() {
    if(this.currentPage > 1) {
      this.currentPage -= 1
    }
  }
}