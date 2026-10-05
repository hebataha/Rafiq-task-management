import { Component, inject, signal } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { form, FormField, maxLength, minLength, required, validate } from '@angular/forms/signals';
import { ProjectCreateEpicService } from '../services/project-create-epic-service';
import { ProjectMembersService } from '../services/project-members-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast';

@Component({
  imports: [Breadcrumb, FormField],
  selector: 'app-project-create-epic',
  styleUrl: './project-create-epic.css',
  templateUrl: './project-create-epic.html',
})
export class ProjectCreateEpic {

  _ProjectCreateEpicService = inject(ProjectCreateEpicService);
  _ProjectMembersService = inject(ProjectMembersService)
  _ActivatedRoute = inject(ActivatedRoute);
  _ToastService = inject(ToastService);
  _Router = inject(Router)
  loading = signal(false);
  errorApi = signal(false);
  memberData: any = [];
  projectId: string = "";
  selectedId: string | null = null;
  loadingEpic = signal(false)

  ngOnInit(): void {
    this.projectId = this._ActivatedRoute.snapshot.paramMap.get('id')!;
    if (this.projectId) {
      this.getMmebers(this.projectId);
    }


    console.log("member epic ID", this.projectId);

  }
  // Signal Form

  epicCreate = signal({
    title: "",
    description: "",
    assign: "",
    deadline: "",
  })
  epicForm = form(this.epicCreate, (field) => {
    required(field.title, { message: "title required" });
    minLength(field.title, 3, {
      message: "title must be at least 3 characters"
    });
    maxLength(field.description, 500, {
      message: "description must not exceed 500 characters"
    });



  })
  isDeadlineInvalid(deadline: string | null): boolean {
    if (!deadline) {
      return false;
    }

    const selectedDate = new Date(deadline);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate < today;
  }


  // Signal Form

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
  selectAssignee(event: Event) {
    this.selectedId = (event.target as HTMLSelectElement).value || null;
    console.log("iddddddddddddddddddddddddddd", this.selectedId);

  }

  getEpic() {
    this.loadingEpic.set(true)

    const title = this.epicCreate().title.trim();
    const description = this.epicCreate().description;
    const assignee_id = this.selectedId;
    const projectId = this.projectId;
    const deadline = this.epicCreate().deadline || null;
    if (this.isDeadlineInvalid(deadline)) {
      console.log('Deadline cannot be before today');
      return;
    }
    console.log("title", title)
    console.log("description", description)
    console.log("assignee_id", assignee_id)
    console.log("projectId", projectId)
    console.log("deadline", deadline)
    if (!this.projectId) {
      return;
    }
    this._ProjectCreateEpicService.createEpicCation(title, description, assignee_id, this.projectId, deadline).subscribe({
      next: (res: any) => {
        console.log('Epic created:', res);
        this.loadingEpic.set(false)
        this._ToastService.show(
          'Epic created successfully',
          "success"
        );
        this._Router.navigate([`/project/${this.projectId}/epics`])
      },
      error: (err: any) => {
        console.log('Create epic error:', err);
        this.loadingEpic.set(false)

        this._ToastService.show(
          `${err.message}`,
          "error"
        );


      }
    })
  }
  cancel() {
    this._Router.navigate([`/project/${this.projectId}/epics`])
  }

}

