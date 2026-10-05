import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectEpicDetails } from './project-epic-details';

describe('ProjectEpicDetails', () => {
  let component: ProjectEpicDetails;
  let fixture: ComponentFixture<ProjectEpicDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEpicDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectEpicDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
