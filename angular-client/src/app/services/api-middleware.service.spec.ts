import { TestBed, inject } from '@angular/core/testing';

import { GetAllFacilitiesService } from './get-all-facilities.service';

describe('GetAllFacilitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllFacilitiesService]
    });
  });

  it('should ...', inject([GetAllFacilitiesService], (service: GetAllFacilitiesService) => {
    expect(service).toBeTruthy();
  }));
});
