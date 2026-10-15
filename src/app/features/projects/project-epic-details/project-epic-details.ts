import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { EpicDetails } from '../services/epic-details';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';

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
  projectId = this._ActivatedRoute.snapshot.paramMap.get('id')!;
  selectedEpicId: string | null = null;
  detailsList = signal<any>(null);
  loading = signal(false)


  ngOnInit(): void {
    this.getDetails(this.projectId, this.id)
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
