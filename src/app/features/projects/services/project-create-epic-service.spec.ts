import { TestBed } from '@angular/core/testing';
import { ProjectCreateEpicService } from './project-create-epic-service';

describe('ProjectCreateEpicService', () => {
  let service: ProjectCreateEpicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCreateEpicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
