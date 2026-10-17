import { TestBed } from '@angular/core/testing';
import { RestPassword } from './rest-password';

describe('RestPassword', () => {
  let service: RestPassword;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestPassword);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
