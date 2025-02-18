import { TestBed } from '@angular/core/testing';

import { RoleGuard } from './role.guard';

describe('RoleService', () => {
  let service: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
