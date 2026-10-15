import { TestBed } from '@angular/core/testing';
import { EditEpicDetails } from './edit-epic-details';

describe('EditEpicDetails', () => {
  let service: EditEpicDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditEpicDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
