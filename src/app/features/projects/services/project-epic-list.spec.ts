import { TestBed } from '@angular/core/testing';
import { ProjectEpicList } from './project-epic-list';

describe('ProjectEpicList', () => {
  let service: ProjectEpicList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectEpicList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
