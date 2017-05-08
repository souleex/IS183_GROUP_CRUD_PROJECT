import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFacilitiesComponent } from './view-all-facilities.component';

describe('ViewAllFacilitiesComponent', () => {
  let component: ViewAllFacilitiesComponent;
  let fixture: ComponentFixture<ViewAllFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllFacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
