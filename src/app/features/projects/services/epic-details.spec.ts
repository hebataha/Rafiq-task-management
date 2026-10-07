import { TestBed } from '@angular/core/testing';
import { EpicDetails } from './epic-details';

describe('EpicDetails', () => {
  let service: EpicDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpicDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
