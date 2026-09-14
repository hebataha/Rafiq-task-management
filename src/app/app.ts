import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggedInHeader } from './shared/logged-in-header/logged-in-header';

@Component({
  imports: [RouterOutlet, LoggedInHeader],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Rafiq-task-management');
}
