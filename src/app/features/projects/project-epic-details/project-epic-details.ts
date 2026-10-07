import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { EpicDetails } from '../services/epic-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
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


  ngOnInit(): void {
    this.getDetails(this.projectId, this.id)
  }

  getDetails(projectId: string, epicId: string) {
    this._EpicDetails.epicDeatils(projectId, epicId).subscribe({
      next: (res) => {
        console.log("details",res);
        // this.selectedEpicId = res.id
        // console.log(this.selectedEpicId);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
