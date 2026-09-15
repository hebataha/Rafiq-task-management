import { Component } from '@angular/core';
import { AuthUserService } from '../layouts/auth-user-service';
import { AuthUser } from '../layouts/auth-user';

@Component({
  imports: [],
  selector: 'app-logged-in-header',
  styleUrl: './logged-in-header.scss',
  templateUrl: './logged-in-header.html',
})
export class LoggedInHeader {
  userData: AuthUser | null = null;
  constructor(private _AuthUserService: AuthUserService) {
    this.getData()


  }
  getData() {

    this._AuthUserService.getUserData().subscribe({
      next: (res: any) => {
        console.log(' user data', res.user_metadata);
        this.userData = res.user_metadata;
      },
      error: (err: any) => {
        console.log('user error', err);
      }
    })
  }
}
