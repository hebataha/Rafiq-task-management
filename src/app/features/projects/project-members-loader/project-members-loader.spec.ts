import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectMembersLoader } from './project-members-loader';

describe('ProjectMembersLoader', () => {
  let component: ProjectMembersLoader;
  let fixture: ComponentFixture<ProjectMembersLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMembersLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMembersLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
