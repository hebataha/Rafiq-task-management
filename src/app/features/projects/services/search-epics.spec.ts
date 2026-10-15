import { TestBed } from '@angular/core/testing';
import { SearchEpics } from './search-epics';

describe('SearchEpics', () => {
  let service: SearchEpics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEpics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
