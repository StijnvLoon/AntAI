import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntComponent } from './ant.component';

describe('AntComponent', () => {
  let component: AntComponent;
  let fixture: ComponentFixture<AntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
