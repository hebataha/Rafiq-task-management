import { Component, signal } from '@angular/core';
import { AddProjectsModules } from './modules/add-projects';
import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [JsonPipe, FormField],
  selector: 'app-add-projects',
  styleUrl: './add-projects.css',
  templateUrl: './add-projects.html',
})

export class AddProjects {
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

}
