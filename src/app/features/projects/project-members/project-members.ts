import { Component, inject, OnInit, signal } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { ProjectMembersService } from '../services/project-members-service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProjectMembersLoader } from '../project-members-loader/project-members-loader';
import { ProjectMembersError } from '../project-members-error/project-members-error';

@Component({
  imports: [Breadcrumb, NgClass, ProjectMembersLoader, ProjectMembersError],
  selector: 'app-project-members',
  styleUrl: './project-members.css',
  templateUrl: './project-members.html',
})
export class ProjectMembers implements OnInit {
  _ProjectMembersService = inject(ProjectMembersService)
  _ActivatedRoute = inject(ActivatedRoute);
  memberData: any = []
  loading = signal(false);
  errorApi = signal(false)

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getMmebers(id)

    }



  }

  getMmebers(id: string) {
    this.loading.set(true)
    this._ProjectMembersService.getMembers(id).subscribe({
      next: (res) => {
        console.log("_ProjectMembersService", res);
        this.memberData = res;
        this.loading.set(false)


      },
      error: (err) => {
        console.log(err);
        this.loading.set(false)
        this.errorApi.set(true)


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
