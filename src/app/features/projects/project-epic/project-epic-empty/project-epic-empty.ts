import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-project-epic-empty',
  styleUrl: './project-epic-empty.css',
  templateUrl: './project-epic-empty.html',
})
export class ProjectEpicEmpty {
  private _ActivatedRoute = inject(ActivatedRoute);

  projectId = this._ActivatedRoute.snapshot.paramMap.get('id');

}
