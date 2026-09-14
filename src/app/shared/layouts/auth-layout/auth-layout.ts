import { Component } from '@angular/core';
import { AuthHeader } from '../../auth-header/auth-header';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AuthHeader, RouterOutlet],
  selector: 'app-auth-layout',
  styleUrl: './auth-layout.css',
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
