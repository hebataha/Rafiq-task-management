import { Component, signal } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';

@Component({
  imports: [Breadcrumb, FormField],
  selector: 'app-project-create-epic',
  styleUrl: './project-create-epic.css',
  templateUrl: './project-create-epic.html',
})
export class ProjectCreateEpic {
  epicCreate = signal({
    title: "",
    discription: "",
    assign: "",
    deadline: "",
  })


  epicForm = form(this.epicCreate, (field) => {
    required(field.title , { message: "title required"});
    minLength(field.title, 3, {
      message: "title must be at least 3 characters"
    });
    maxLength(field.discription, 500, {
      message: "discription must not exceed 64 characters"
    });

  })
}
