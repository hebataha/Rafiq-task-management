import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from './services/project-service';
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
  dataResult = signal<AddProjectsModules[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.loading.set(true);
    this.ProjectService.getProjects().subscribe({
      next: (res: any) => {
        this.dataResult.set(Array.isArray(res) ? res : []);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      }
    });
  }
}
