import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from './services/project-service';
import { HttpClient } from '@angular/common/http';
import { AddProjectsModules } from './modules/add-projects';
import { DatePipe } from '@angular/common';


@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  ProjectService = inject(ProjectService);
  http = inject(HttpClient)
  dataResult: AddProjectsModules[] = [];
  loading: boolean = true;
  ngOnInit() {
    this.getAllProjects();
  }
  getAllProjects() {
    this.loading = true
    this.ProjectService.getProjects().subscribe({
      next: (res: any) => {
        console.log("projects added", res);
        this.dataResult = res;
        this.loading = false;



      },
      error: (err) => {
        console.log(err);
        this.loading = false

      }
    })
  }
}
