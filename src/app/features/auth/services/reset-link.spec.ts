import { TestBed } from '@angular/core/testing';
import { ResetLink } from './reset-link';

describe('ResetLink', () => {
  let service: ResetLink;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetLink);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
