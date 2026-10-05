import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectEpicError } from './project-epic-error';

describe('ProjectEpicError', () => {
  let component: ProjectEpicError;
  let fixture: ComponentFixture<ProjectEpicError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEpicError],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectEpicError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
