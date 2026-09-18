import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { LoginModule } from '../../models/login';
import { JsonPipe } from '@angular/common';
import { LoginApi } from '../../services/login';
import { AuthState } from '../../../../core/interceptors/services/auth-state';
import { ToastService } from '../../../../core/services/toast';

@Component({
  imports: [FormField, RouterLink, JsonPipe],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})

export class Login {
  constructor(private _LoginApi: LoginApi, private _Router: Router, private _AuthState: AuthState, private _ToastService: ToastService) {

  }
  apiError: string = "";
  loginModel = signal<LoginModule>({
    email: '',
    password: '',
    rememberMe: false,
  })

  loginForm = form(this.loginModel, (fields) => {
    required(fields.email, { message: "email is required" });
    email(fields.email, { message: "please enter a vaild email" });
    required(fields.password, { message: "password is required" });
  });

  login() {
    console.log(this.loginModel().email);
    console.log(this.loginModel().password);

    this._LoginApi.loginData(this.loginModel().email, this.loginModel().password).subscribe({
      next: (res) => {
        console.log(res);
        this._AuthState.password = this.loginModel().password;
        localStorage.setItem("access_token", res.access_token);
        if (localStorage.getItem("access_token")) {
          this._Router.navigate(['/projects'])
        }
        localStorage.setItem("refresh_token", res.refresh_token);
        this._ToastService.show(
          'logined in succefully',
          "success"
        )



      },
      error: (err) => {
        console.log(err);
        this.apiError = err.error.msg;
        this._ToastService.show(
          this.apiError,
          "error"
        )
      }
    });
    // this.testRefresh()
  }
  testRefresh() {
    this._LoginApi.refreshToken().subscribe({
      next: (res) => {
        console.log('refresh success', res);
      },
      error: (err) => {
        console.log('refresh error', err);
      }
    });
  }

}
