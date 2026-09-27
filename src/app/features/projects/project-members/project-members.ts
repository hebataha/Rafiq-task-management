import { Component, inject, OnInit, signal } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { ProjectMembersService } from '../services/project-members-service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  imports: [Breadcrumb , NgClass],
  selector: 'app-project-members',
  styleUrl: './project-members.css',
  templateUrl: './project-members.html',
})
export class ProjectMembers implements OnInit {
  _ProjectMembersService = inject(ProjectMembersService)
  _ActivatedRoute = inject(ActivatedRoute);
  memberData: any = []
  loading = signal(false);

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getMmebers(id)

    }
    
 

  }

  getMmebers(id: string) {
    this._ProjectMembersService.getMembers(id).subscribe({
      next: (res) => {
        console.log("_ProjectMembersService", res);
        this.memberData = res;

      },
      error: (err) => {
        console.log(err);

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
