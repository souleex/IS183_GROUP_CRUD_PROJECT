import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAReservationComponent } from './view-a-reservation.component';

describe('ViewAReservationComponent', () => {
  let component: ViewAReservationComponent;
  let fixture: ComponentFixture<ViewAReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
