import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationnavemenuComponent } from './reservationnavemenu.component';

describe('ReservationnavemenuComponent', () => {
  let component: ReservationnavemenuComponent;
  let fixture: ComponentFixture<ReservationnavemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationnavemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationnavemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
