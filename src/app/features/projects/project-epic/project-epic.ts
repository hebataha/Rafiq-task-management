import { Component, inject, OnInit, signal } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectId } from '../services/project-id';
import { ProjectEpicList } from '../services/project-epic-list';
import { ProjectEpicLoader } from './project-epic-loader/project-epic-loader';
import { ProjectEpicError } from './project-epic-error/project-epic-error';
import { ProjectEpicEmpty } from './project-epic-empty/project-epic-empty';
import { DatePipe } from '@angular/common';
import { ProjectEpicDetails } from '../project-epic-details/project-epic-details';

@Component({
  imports: [Breadcrumb, RouterLink, ProjectEpicLoader, ProjectEpicError, ProjectEpicEmpty, DatePipe, ProjectEpicDetails],
  selector: 'app-project-epic',
  styleUrl: './project-epic.css',
  templateUrl: './project-epic.html',
})
export class ProjectEpic implements OnInit {
  public _ProjectId = inject(ProjectId);
  _ProjectEpicList = inject(ProjectEpicList);
  private _ActivatedRoute = inject(ActivatedRoute);
  epicsData: any[] = [];
  loading = signal(false)
  error = signal(false) 
  projectId = this._ActivatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getEpics()
  }

  getEpics() {
    this.loading.set(true)
    this._ProjectEpicList.getProjectsEpic(this.projectId).subscribe({
      next: (res: any) => {
        console.log(" getEpics()", res);
        this.epicsData = res;
            this.loading.set(false)


      },
      error: (err: any) => {
        console.log(err);
        this.loading.set(false)
        this.error.set(true)


      }
    })
  }
 getname(name?: string) {
    if (!name) return "";
    return name.trim()
      .split(' ')
      .filter(Boolean)
      .map(word => word[0])
      .join('')
      .toUpperCase();


  }
}
