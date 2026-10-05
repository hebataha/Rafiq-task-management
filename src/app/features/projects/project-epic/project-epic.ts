import { Component, inject, OnInit } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectId } from '../services/project-id';
import { ProjectEpicList } from '../services/project-epic-list';

@Component({
  imports: [Breadcrumb, RouterLink],
  selector: 'app-project-epic',
  styleUrl: './project-epic.css',
  templateUrl: './project-epic.html',
})
export class ProjectEpic implements OnInit{
  public _ProjectId = inject(ProjectId);
  _ProjectEpicList = inject(ProjectEpicList);

  private _ActivatedRoute = inject(ActivatedRoute);

  projectId = this._ActivatedRoute.snapshot.paramMap.get('id');

ngOnInit(): void {
   this.getEpics()
}

  getEpics() {
    this._ProjectEpicList.getProjectsEpic(this.projectId).subscribe({
      next: (res: any) => {
        console.log(" getEpics()",res);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

}
