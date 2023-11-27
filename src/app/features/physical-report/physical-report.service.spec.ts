import { TestBed } from '@angular/core/testing';

import { PhysicalReportService } from './physical-report.service';

describe('PhysicalReportService', () => {
  let service: PhysicalReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
