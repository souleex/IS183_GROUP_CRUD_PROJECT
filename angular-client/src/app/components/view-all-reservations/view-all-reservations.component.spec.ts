import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllReservationsComponent } from './reservationsnavmenu.component';

describe('ViewAllReservationsComponent', () => {
  let component: ViewAllReservationsComponent;
  let fixture: ComponentFixture<ViewAllReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
