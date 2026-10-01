import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from './services/project-service';
import { AddProjectsModules } from './modules/add-projects';
import { DatePipe } from '@angular/common';
import { ProjectId } from './services/project-id';
import { ProjectPagination } from './services/project-pagination';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  ProjectService = inject(ProjectService);
  _ProjectPagination = inject(ProjectPagination)
  router = inject(Router);
  ProjectId = inject(ProjectId)
  dataResult = signal<AddProjectsModules[]>([]);
  loading = signal(true);
  limit: number = 10;
  currentPage = 1;
  offset = (this.currentPage - 1) * this.limit;
  contentRange: string | null = null;
  totalCount = 0;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit() {
    // this.getAllProjects();
    this.getPaginationData()
  }
  changePage(page: number) {
    this.currentPage = page;
    this.offset = (this.currentPage - 1) * this.limit;
  }
  getAllProjects() {
    this.loading.set(true);
    this.ProjectService.getProjects().subscribe({
      next: (res: any) => {
        this.dataResult.set(Array.isArray(res) ? res : []);
        this.loading.set(false);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      }
    });
  }

  details(id: string) {
    console.log("details");
    this.ProjectId.id.set(id)
    this.router.navigate([`/project/${id}/epics`])
  }

  edit(id: string) {
    this.ProjectId.id.set(id)
    this.router.navigate([`/project/${id}/edit`])
  }

  getPaginationData() {
    this.loading.set(true)

    this._ProjectPagination.paginationData(this.limit, this.offset).subscribe({
      next: (res) => {
        const contentRange = res.headers.get('content-range');

        if (contentRange) {
          this.contentRange = contentRange;
          const total = contentRange.split('/')[1];

          this.totalCount = Number(total);
          this.totalPages = Math.ceil(this.totalCount / this.limit);
          this.pages = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );
        }

        console.log(res.headers.get('content-range'));
        console.log("res.body", res.body);
        this.dataResult.set(Array.isArray(res.body) ? res.body : []);
        this.loading.set(false)



      },
      error: (err) => {
        console.log(err);
        this.loading.set(false)


      }
    })
  }
}
