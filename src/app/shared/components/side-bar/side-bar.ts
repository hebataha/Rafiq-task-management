import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-side-bar',
  styleUrl: './side-bar.scss',
  templateUrl: './side-bar.html',
})
export class SideBar {
  isExpanded = false;
  textCollapse = false;
   toggle(): void {
    this.isExpanded = !this.isExpanded;
   }
  sidebarCollapse() {
    this.textCollapse = !this.textCollapse;
  }
}
