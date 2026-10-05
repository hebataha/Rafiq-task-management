import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-project-epic-details',
  styleUrl: './project-epic-details.css',
  templateUrl: './project-epic-details.html',
})
export class ProjectEpicDetails {
  @Input() showPop = false;
  @Output() closePop = new EventEmitter<void>();
}
