import { TestBed } from '@angular/core/testing';
import { UpdateProject } from './update-project';

describe('UpdateProject', () => {
  let service: UpdateProject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateProject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
