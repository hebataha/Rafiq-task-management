import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink
} from '@angular/router';

import { filter, map, startWith } from 'rxjs';

import { AuthUserService } from '../../layouts/auth-user-service';
import { ToastService } from '../../services/toast';
import { ProjectId } from '../../../features/projects/services/project-id';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-side-bar',
  styleUrl: './side-bar.scss',
  templateUrl: './side-bar.html',
})
export class SideBar {

  private _Router = inject(Router);
  private _AuthUserService = inject(AuthUserService);
  private _ToastService = inject(ToastService);
  public _ProjectId = inject(ProjectId);

  constructor(

  ) {}

  isExpanded = false;
  textCollapse = false;
  errMsg = '';
  loadingState = false;

  showProjectMenu = this._Router.events.pipe(

    filter(
      (event): event is NavigationEnd =>
        event instanceof NavigationEnd
    ),

    startWith(null),

    map(() =>
      this._Router.url.startsWith('/project/')
    )

  );

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  sidebarCollapse() {
    this.textCollapse = !this.textCollapse;
  }

  logout() {
    this.loadingState = true;

    this._AuthUserService.logout().subscribe({

      next: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        this.loadingState = false;

        this._Router.navigate(['/login']);

        this._ToastService.show(
          'Logged out successfully',
          'success'
        );
      },

      error: (err) => {
        console.log('we have an error', err.error);

        this.loadingState = false;

        this._ToastService.show(
          'Logout failed',
          'error'
        );
      }

    });
  }
}