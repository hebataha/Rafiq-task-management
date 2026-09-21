import { TestBed } from '@angular/core/testing';
import { ProjectId } from './project-id';

describe('ProjectId', () => {
  let service: ProjectId;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
