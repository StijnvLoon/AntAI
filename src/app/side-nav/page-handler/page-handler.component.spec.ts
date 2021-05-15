import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHandlerComponent } from './page-handler.component';

describe('PageHandlerComponent', () => {
  let component: PageHandlerComponent;
  let fixture: ComponentFixture<PageHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
