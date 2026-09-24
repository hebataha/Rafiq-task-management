import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectId } from '../services/project-id';
@Component({
  imports: [],
  selector: 'app-project-details',
  styleUrl: './project-details.css',
  templateUrl: './project-details.html',
})
export class ProjectDetails implements OnInit {
  _ActivatedRoute = inject(ActivatedRoute);
  _ProjectId = inject(ProjectId);
  ngOnInit() {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');

    console.log("id in details", id);
    if (id) {
      this._ProjectId.id.set(id);
    }
  }
}
