import { TestBed } from '@angular/core/testing';

import { LivestockgroupService } from './livestockgroup.service';

describe('LivestockgroupService', () => {
  let service: LivestockgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivestockgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
