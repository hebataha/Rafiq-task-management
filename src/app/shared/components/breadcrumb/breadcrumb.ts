import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-breadcrumb',
  styleUrl: './breadcrumb.css',
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  @Input() category = ""
  @Input() PageName =""
}
