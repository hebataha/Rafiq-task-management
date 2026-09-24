import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  form,
  maxLength,
  minLength,
  required,
  FormField
} from '@angular/forms/signals';

import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { ToastService } from '../../../shared/services/toast';

import { AddProjectsModules } from '../modules/add-projects';
import { GetProjectService } from '../services/get-product';
import { UpdateProjectService } from '../services/update-project';

@Component({
  imports: [
    Breadcrumb,
    FormField
  ],
  selector: 'app-project-edit',
  styleUrl: './project-edit.css',
  templateUrl: './project-edit.html',
})
export class ProjectEdit implements OnInit {

  private _ActivatedRoute = inject(ActivatedRoute);
  private _GetProjectService = inject(GetProjectService);
  private _ToastService = inject(ToastService);
  private _Router = inject(Router);
  private _UpdateProjectService = inject(UpdateProjectService)

  loading = false;

  projectId = this._ActivatedRoute.snapshot.paramMap.get('id');

  projectModel = signal<AddProjectsModules>({
    name: '',
    description: '',
    id: ''
  });

  projectForm = form(this.projectModel, (fields) => {

    required(fields.name, {
      message: 'Project name is required'
    });

    minLength(fields.name, 3, {
      message: 'Project name must be at least 3 characters'
    });

    maxLength(fields.name, 100, {
      message: 'Project name must be max 100 characters'
    });

    maxLength(fields.description, 500, {
      message: 'Description must be max 500 characters'
    });

  });

  ngOnInit(): void {

    console.log('project id:', this.projectId);

    if (!this.projectId) {
      return;
    }

    this.loading = true;

    this._GetProjectService
      .getProjectById(this.projectId)
      .subscribe({

        next: (res: any) => {

          console.log('project data:', res);

          const project = res[0];

          this.projectModel.set({
            id: project.id,
            name: project.name,
            description: project.description
          });

          this.loading = false;
        },

        error: (err) => {

          console.log('error:', err);

          this.loading = false;

          this._ToastService.show(
            'Could not load project',
            'error'
          );
        }

      });

  }

  update() {

    if (!this.projectId) {
      return;
    }

    const name = this.projectForm.name().value();
    const description = this.projectForm.description().value();

    this.loading = true;

    this._UpdateProjectService
      .updateProject(
        this.projectId,
        name,
        description
      )
      .subscribe({

        next: (res) => {

          console.log('updated project:', res);

          this.loading = false;

          this._ToastService.show(
            'Project updated successfully',
            'success'
          );

          this._Router.navigate(['/projects']);
        },

        error: (err) => {

          console.log('update error:', err);

          this.loading = false;

          this._ToastService.show(
            'Project update failed',
            'error'
          );

        }

      });

  }

}