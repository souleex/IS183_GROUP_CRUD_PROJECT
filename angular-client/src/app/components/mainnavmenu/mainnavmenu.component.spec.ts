import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainnavmenuComponent } from './mainnavmenu.component';

describe('MainnavmenuComponent', () => {
  let component: MainnavmenuComponent;
  let fixture: ComponentFixture<MainnavmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainnavmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainnavmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
