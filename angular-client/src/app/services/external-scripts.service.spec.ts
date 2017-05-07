import { TestBed, inject } from '@angular/core/testing';

import { ExternalScriptsService } from './external-scripts.service';

describe('ExternalScriptsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalScriptsService]
    });
  });

  it('should ...', inject([ExternalScriptsService], (service: ExternalScriptsService) => {
    expect(service).toBeTruthy();
  }));
});
