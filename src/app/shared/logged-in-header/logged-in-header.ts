import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../layouts/auth-user-service';
import { AuthUser } from '../layouts/auth-user';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-logged-in-header',
  styleUrl: './logged-in-header.scss',
  templateUrl: './logged-in-header.html',
})
export class LoggedInHeader implements OnInit {
  userData: AuthUser | null = null;
  loading: boolean = false;
  constructor(private _AuthUserService: AuthUserService, private _Router: Router) {


  }
  ngOnInit(): void {
    this.getData()
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

  getData() {
    this.loading = true;

    this._AuthUserService.getUserData().subscribe({
      next: (res: any) => {
        console.log(' user data', res.user_metadata);
        this.userData = res.user_metadata;
        this.loading = false;
      },
      error: (err: any) => {
        console.log('user error', err);
        this.loading = true
      }

    })
  }
}
