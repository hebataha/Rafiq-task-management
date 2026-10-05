import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectEpicEmpty } from './project-epic-empty';

describe('ProjectEpicEmpty', () => {
  let component: ProjectEpicEmpty;
  let fixture: ComponentFixture<ProjectEpicEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEpicEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectEpicEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
