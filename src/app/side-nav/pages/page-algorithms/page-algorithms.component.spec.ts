import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAlgorithmsComponent } from './page-algorithms.component';

describe('PageAlgorithmsComponent', () => {
  let component: PageAlgorithmsComponent;
  let fixture: ComponentFixture<PageAlgorithmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAlgorithmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAlgorithmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
