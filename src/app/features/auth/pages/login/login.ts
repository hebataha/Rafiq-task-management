import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { LoginModule } from '../../models/login';
import { JsonPipe } from '@angular/common';
import { LoginApi } from '../../services/login';

@Component({
  imports: [FormField, RouterLink ,JsonPipe],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
  
export class Login {
  constructor(private _LoginApi:LoginApi) {
    
  }
  loginModel = signal<LoginModule>({
    email: '',
    password: '',
    rememberMe: false,
  })
  
  loginForm = form(this.loginModel, (fields) => {
    required(fields.email, {message:"email is required"});
    email(fields.email , {message:"please enter a vaild email"});
    required(fields.password ,{message:"password is required"});    
  });

  login() {
  alert("heba")
  this._LoginApi.loginData().subscribe({
    next: (res) => {
      console.log(res);

     
    },
    error: (err) => {
      console.log(err);
    }
  });
}
 
}
