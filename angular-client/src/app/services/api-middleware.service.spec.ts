import { TestBed, inject } from '@angular/core/testing';

import { APIMiddleWare } from './api-middleware.service';

describe('APIMiddleWare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIMiddleWare]
    });
  });

  it('should ...', inject([APIMiddleWare], (service: APIMiddleWare) => {
    expect(service).toBeTruthy();
  }));
});
