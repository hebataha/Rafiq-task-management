import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCreateEpic } from './project-create-epic';

describe('ProjectCreateEpic', () => {
  let component: ProjectCreateEpic;
  let fixture: ComponentFixture<ProjectCreateEpic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCreateEpic],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCreateEpic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
