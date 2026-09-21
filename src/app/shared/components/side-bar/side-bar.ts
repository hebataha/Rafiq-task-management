import { Component } from '@angular/core';
import { AuthUserService } from '../../layouts/auth-user-service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast';
import { ProjectId } from '../../../features/projects/services/project-id';

@Component({
  imports: [RouterLink],
  selector: 'app-side-bar',
  styleUrl: './side-bar.scss',
  templateUrl: './side-bar.html',
})
export class SideBar {
  constructor(private _AuthUserService: AuthUserService, private _Router: Router, private _ToastService: ToastService, public _ProjectId:ProjectId) {

  }
  isExpanded = false;
  textCollapse = false;
  errMsg = "";
  loadingState: boolean = false;
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
          this._Router.navigate(['/login']),
              this.loadingState = false;

        this._ToastService.show(
          'logined out succefully',
          "success"
        )

      },
      error: (err) => {
        console.log("we have an error", err.error),
          this.loadingState = false;
        this._ToastService.show(
          '404 error',
          "error"
        )
      }
    })
  }
}
