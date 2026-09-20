import { Component } from '@angular/core';
import { LoggedInHeader } from '../../logged-in-header/logged-in-header';
import { SideBar } from '../../components/side-bar/side-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [LoggedInHeader, RouterOutlet, SideBar],
  selector: 'app-app-layout',
  styleUrl: './app-layout.css',
  templateUrl: './app-layout.html',
})
export class AppLayout {}
