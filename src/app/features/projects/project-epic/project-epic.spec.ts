import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectEpic } from './project-epic';

describe('ProjectEpic', () => {
  let component: ProjectEpic;
  let fixture: ComponentFixture<ProjectEpic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEpic],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectEpic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
