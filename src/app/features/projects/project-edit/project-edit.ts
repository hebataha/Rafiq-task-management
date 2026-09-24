import { Component, inject, signal } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast';
import { AddProjectService } from '../services/add-project-service';
import { AddProjectsModules } from '../modules/add-projects';
import { form, maxLength, minLength, required, FormField } from '@angular/forms/signals';

@Component({
  imports: [Breadcrumb, FormField],
  selector: 'app-project-edit',
  styleUrl: './project-edit.css',
  templateUrl: './project-edit.html',
})
export class ProjectEdit {
   _AddProjectService = inject(AddProjectService);
    _ToastService = inject(ToastService)
    _router= inject(Router)
    loading: boolean = false;
    addProject = signal<AddProjectsModules>({
      name: '',
      description: '',
      id:''
    })
    projectForm = form(this.addProject, (fields) => {
    required(fields.name, { message: "project name is required" });
    minLength(fields.name, 3, { message: "Project name must be at least 3 characters" });
    maxLength(fields.name, 100, { message: "Project name must be max characters 100" });

    maxLength(fields.description, 500)
  });
  create() {
    const name = this.projectForm.name().value();
    const description = this.projectForm.description().value();
    this._AddProjectService.addProject(name, description).subscribe({
      next: (res) => {
        console.log("add project ", res);
        this.addProject.set(
          {

            name: '',
            description: '',
            id: ''
          }
        )

        this._ToastService.show(
          'project created succefully',
          "success"
        )
        this._router.navigate(['/projects'])

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
