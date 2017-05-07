import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsnavmenuComponent } from './reservationsnavmenu.component';

describe('ReservationsnavmenuComponent', () => {
  let component: ReservationsnavmenuComponent;
  let fixture: ComponentFixture<ReservationsnavmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsnavmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsnavmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
