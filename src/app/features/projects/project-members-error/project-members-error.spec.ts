import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectMembersError } from './project-members-error';

describe('ProjectMembersError', () => {
  let component: ProjectMembersError;
  let fixture: ComponentFixture<ProjectMembersError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMembersError],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMembersError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
