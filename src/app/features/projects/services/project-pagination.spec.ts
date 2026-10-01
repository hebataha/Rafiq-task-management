import { TestBed } from '@angular/core/testing';
import { ProjectPagination } from './project-pagination';

describe('ProjectPagination', () => {
  let service: ProjectPagination;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPagination);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
