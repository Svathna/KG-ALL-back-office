import { TestBed } from '@angular/core/testing';

import { TaxPerMonthsService } from './tax-per-months.service';

describe('TaxPerMonthsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxPerMonthsService = TestBed.get(TaxPerMonthsService);
    expect(service).toBeTruthy();
  });
});
