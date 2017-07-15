import { TestBed, inject } from '@angular/core/testing';

import { PreserService } from './preser.service';

describe('PreserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreserService]
    });
  });

  it('should be created', inject([PreserService], (service: PreserService) => {
    expect(service).toBeTruthy();
  }));
});
