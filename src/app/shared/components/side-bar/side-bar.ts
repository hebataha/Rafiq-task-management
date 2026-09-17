import { Component } from '@angular/core';
import { AuthUserService } from '../../layouts/auth-user-service';
import { Router } from '@angular/router';
import { AuthState } from '../../../core/interceptors/services/auth-state';

@Component({
  imports: [],
  selector: 'app-side-bar',
  styleUrl: './side-bar.scss',
  templateUrl: './side-bar.html',
})
export class SideBar {
  constructor(private _AuthUserService: AuthUserService,private _Router:Router ) {

  }
  isExpanded = false;
  textCollapse = false;
  errMsg = "";
   toggle(): void {
    this.isExpanded = !this.isExpanded;
   }
  sidebarCollapse() {
    this.textCollapse = !this.textCollapse;
  }
  logout() {      
    this._AuthUserService.logout().subscribe({
      next: () => {
        localStorage.removeItem("access_token"),
        localStorage.removeItem("refresh_token"),
        this._Router.navigate(['/login'])
        
      },
      error: (err) => {
        console.log("we have an error",err.error)
      }
  })
}
}
