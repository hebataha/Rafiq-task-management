import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { LoginModule } from '../../models/login';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginModel = signal<LoginModule>({
    email: '',
    password: '',
    rememberMe: false,
  })
  
  
  loginForm = form(this.loginModel, (fields) => {
    required(fields.email);
    email(fields.email);
    required(fields.password);
    minLength(fields.password, 8);
    
  });
 
}
