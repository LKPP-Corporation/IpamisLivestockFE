import { TestBed } from '@angular/core/testing';

import { LCSBService } from './lcsb.service';

describe('LCSBService', () => {
  let service: LCSBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LCSBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
