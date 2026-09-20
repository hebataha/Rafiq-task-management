import { Component, inject, signal } from '@angular/core';
import { AddProjectsModules } from '../modules/add-projects';
import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { AddProjectService } from './add-project-service';
import { ToastService } from '../../../shared/services/toast';

@Component({
  imports: [FormField],
  selector: 'app-add-projects',
  styleUrl: './add-projects.css',
  templateUrl: './add-projects.html',
})

export class AddProjects {
  _AddProjectService = inject(AddProjectService);
  _ToastService = inject(ToastService)
  loading: boolean = false;
  addProject = signal<AddProjectsModules>({
    title: '',
    description: '',
  })


  projectForm = form(this.addProject, (fields) => {
    required(fields.title, { message: "project title is required" });
    minLength(fields.title, 3, { message: "Project title must be at least 3 characters" });
    maxLength(fields.title, 100, { message: "Project title must be max characters 100" });

    maxLength(fields.description, 500)
  });
  create() {
    const title = this.projectForm.title().value();
    const description = this.projectForm.description().value();
    this._AddProjectService.addProject(title, description).subscribe({
      next: (res) => {
        console.log("add project ", res);
        this.addProject.set(
          {

            title: '',
            description: '',
          }
        )


        this._ToastService.show(
          'project created succefully',
          "success"
        )

      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this._ToastService.show(
          'project not created ',
          "error"
        )

      }

    })
  }
}
