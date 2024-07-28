import { TestBed } from '@angular/core/testing';

import { AtiviadesServiceService } from './ativiades.service';

describe('AtiviadesServiceService', () => {
  let service: AtiviadesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtiviadesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
