import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { LoginModule } from '../../models/login';
import { JsonPipe } from '@angular/common';
import { LoginApi } from '../../services/login';

@Component({
  imports: [FormField, RouterLink, JsonPipe],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})

export class Login {
  constructor(private _LoginApi: LoginApi , private _Router:Router) {

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
        this._Router.navigate(['/projects'])
        


      },
      error: (err) => {
        console.log(err);
        this.apiError = err.error.msg;
      }
    });
  }

}
