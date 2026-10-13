import { Component, computed, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ResetLink } from '../../services/reset-link';

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-forgot-password',
  styleUrl: './forgot-password.css',
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  _ResetLink = inject(ResetLink);
  loading = signal(false);
  Successful = signal(false);
  countdown = signal(300);
  minutes = computed(() => Math.floor(this.countdown() / 60));
  seconds = computed(() => this.countdown() % 60);
  resendAttempts = signal(0);
  forgetEmail = signal({
    email: ""
  })

  forgetForm = form(this.forgetEmail, (field) => {
    required(field.email, {
      message: 'Email is required'
    });

    email(field.email, {
      message: 'Please enter a valid email address'
    });

  })


sendResetLink() {
  this.loading.set(true);

  this._ResetLink.sendReset(this.forgetEmail().email).subscribe({
    next: (res) => {
      this.loading.set(false);
      this.Successful.set(true);
      this.countdown.set(300);
      this.startCountdown();
    },
    error: (err) => {
      this.loading.set(false);
      console.log(err);
    }
  });
}

  startCountdown() {
    const timer = setInterval(() => {

      this.countdown.update(value => value - 1);

      if (this.countdown() <= 0) {
        clearInterval(timer);
        return;
      }

      if (this.countdown() === 0) {
        clearInterval(timer);
      }


    }, 1000);
  }
  resend() {
  if (this.resendAttempts() >= 3 || this.countdown() > 0 || this.loading()) {
    return;
  }

  this.resendAttempts.update(count => count + 1);

  this.sendResetLink();
}
}
