import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggedInHeader } from './shared/logged-in-header/logged-in-header';
import { Toast } from './shared/components/toast/toast';

@Component({
  imports: [RouterOutlet, LoggedInHeader, Toast],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Rafiq-task-management');
}
