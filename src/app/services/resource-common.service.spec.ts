import { TestBed } from '@angular/core/testing';

import { ResourceCommonService } from './resource-common.service';

describe('ResourceCommonService', () => {
  let service: ResourceCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
