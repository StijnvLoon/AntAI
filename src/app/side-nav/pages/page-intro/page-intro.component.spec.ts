import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIntroComponent } from './page-intro.component';

describe('PageIntroComponent', () => {
  let component: PageIntroComponent;
  let fixture: ComponentFixture<PageIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
