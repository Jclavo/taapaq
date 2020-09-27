import { TestBed } from '@angular/core/testing';

import { TranslationDetailService } from './translation-detail.service';

describe('TranslationDetailService', () => {
  let service: TranslationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
