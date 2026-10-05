import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectEpicLoader } from './project-epic-loader';

describe('ProjectEpicLoader', () => {
  let component: ProjectEpicLoader;
  let fixture: ComponentFixture<ProjectEpicLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEpicLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectEpicLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
