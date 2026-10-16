import { TestBed } from '@angular/core/testing';
import { GetProjectTasks } from './get-project-tasks';

describe('GetProjectTasks', () => {
  let service: GetProjectTasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProjectTasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
