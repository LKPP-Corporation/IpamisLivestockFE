import { TestBed } from '@angular/core/testing';

import { LivestockstatusService } from './livestockstatus.service';

describe('LivestockstatusService', () => {
  let service: LivestockstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivestockstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
