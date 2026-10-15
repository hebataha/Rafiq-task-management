import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { EpicDetails } from '../services/epic-details';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';
import { EditEpicDetails } from '../services/edit-epic-details';

@Component({
  imports: [DatePipe, JsonPipe],
  selector: 'app-project-epic-details',
  styleUrl: './project-epic-details.css',
  templateUrl: './project-epic-details.html',
})
export class ProjectEpicDetails implements OnInit {
  @Input() showPop = false;
  @Output() closePop = new EventEmitter<void>();
  @Input() id!: string;
  _EpicDetails = inject(EpicDetails);
  private _ActivatedRoute = inject(ActivatedRoute);
  _EditEpicDetails = inject(EditEpicDetails)
  projectId = this._ActivatedRoute.snapshot.paramMap.get('id')!;
  // selectedEpicId: string | null = null;
  detailsList = signal<any>(null);
  loading = signal(false);
  isEditingTitle = signal(false);
  editedTitle = signal('');
  editedDescription = signal('');
  isEditingDescription = signal(false);
descriptionSaving = signal(false);

  ngOnInit(): void {
    this.getDetails(this.projectId, this.id)
  }
  startEditDescription() {
  this.editedDescription.set(this.detailsList()?.description ?? '');
  this.isEditingDescription.set(true);
}
  startEditTitle() {
    this.editedTitle.set(this.detailsList()?.title ?? '');
    this.isEditingTitle.set(true);
  }
  saveTitle() {
    const oldTitle = this.detailsList()?.title ?? '';
    const newTitle = this.editedTitle().trim();

    if (!newTitle) {
      this.editedTitle.set(oldTitle);
      this.isEditingTitle.set(false);
      return;
    }

    if (newTitle === oldTitle) {
      this.isEditingTitle.set(false);
      return;
    }

    // نجيب الـ Epic ID
    const epicId = this.detailsList()?.id;

    if (!epicId) {
      return;
    }

    // Optimistic Update
    this.detailsList.update(epic => ({
      ...epic,
      title: newTitle
    }));

    this.isEditingTitle.set(false);

    // PATCH API
    this._EditEpicDetails.editEpicDtailsData(epicId,  { title: newTitle })
      .subscribe({
        next: (res) => {
          console.log('Updated successfully');
        },
        error: (err) => {
          this.detailsList.update(epic => ({
            ...epic,
            title: oldTitle
          }));

          this.editedTitle.set(oldTitle);
          console.log('Failed to update epic', err);
        }
      });
  }
  saveDescription() {
  if (this.descriptionSaving()) return;

  const oldDescription = this.detailsList()?.description ?? null;
  const newDescription = this.editedDescription().trim() || null;

  // لو مفيش تغيير
  if (newDescription === oldDescription) {
    this.isEditingDescription.set(false);
    return;
  }

  const epicId = this.detailsList()?.id;

  if (!epicId) return;

  // Optimistic Update
  this.detailsList.update(epic => ({
    ...epic,
    description: newDescription
  }));

  this.isEditingDescription.set(false);
  this.descriptionSaving.set(true);

  this._EditEpicDetails.editEpicDtailsData(
    epicId,
    { description: newDescription }
  ).subscribe({
    next: () => {
      this.descriptionSaving.set(false);
      console.log('Description updated successfully');
    },
    error: (err) => {
      // Rollback
      this.detailsList.update(epic => ({
        ...epic,
        description: oldDescription
      }));

      this.editedDescription.set(oldDescription ?? '');
      this.descriptionSaving.set(false);

      console.error(err);
      // هنا نعرض Error Toast:
      // Failed to update epic. Please try again.
    }
  });
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
  copyLink() {
    const link = window.location.href;

    navigator.clipboard.writeText(link);
  }
  getDetails(projectId: string, epicId: string) {
    this.loading.set(true)
    this._EpicDetails.epicDeatils(projectId, epicId).subscribe({
      next: (res) => {
        this.loading.set(false)
        console.log("details", res);
        // this.selectedEpicId = res.id
        this.detailsList.set(res[0] ?? null);
        console.log("detailsList", this.detailsList());

      },
      error: (err) => {
        console.log(err);
        this.loading.set(false)

      }
    });
  }
}
