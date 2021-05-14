import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEntitiesComponent } from './page-entities.component';

describe('PageEntitiesComponent', () => {
  let component: PageEntitiesComponent;
  let fixture: ComponentFixture<PageEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
