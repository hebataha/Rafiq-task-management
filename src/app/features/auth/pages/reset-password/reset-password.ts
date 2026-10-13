import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-reset-password',
  styleUrl: './reset-password.css',
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  tokenStatus = signal<'checking' | 'valid' | 'invalid'>('checking');
  ngOnInit() {
    const accessToken = history.state.accessToken;
    console.log(accessToken);

    if (!accessToken) {
      this.tokenStatus.set('invalid');
      return;
    }

  }
}
