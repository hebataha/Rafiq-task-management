import { Component, inject } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { RouterLink } from '@angular/router';
import { ProjectId } from '../services/project-id';

@Component({
  imports: [Breadcrumb, RouterLink],
  selector: 'app-project-epic',
  styleUrl: './project-epic.css',
  templateUrl: './project-epic.html',
})
export class ProjectEpic {
    public _ProjectId = inject(ProjectId);
  
}
