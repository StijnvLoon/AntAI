import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAntsComponent } from './page-ants.component';

describe('PageAntsComponent', () => {
  let component: PageAntsComponent;
  let fixture: ComponentFixture<PageAntsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAntsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
