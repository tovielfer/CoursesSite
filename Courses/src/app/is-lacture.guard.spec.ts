import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLactureGuard } from './is-lacture.guard';

describe('isLactureGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isLactureGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
