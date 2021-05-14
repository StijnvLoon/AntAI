import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCellsComponent } from './page-cells.component';

describe('PageCellsComponent', () => {
  let component: PageCellsComponent;
  let fixture: ComponentFixture<PageCellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
