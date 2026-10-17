import { Component, signal, OnInit, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  form,
  required,
  minLength,
  maxLength,
  pattern,
  validate,
  FormField
} from '@angular/forms/signals';
import { RestPassword } from '../../services/rest-password';
import { ToastService } from '../../../../shared/services/toast';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink, FormField],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  tokenStatus = signal<'checking' | 'valid' | 'invalid'>('checking');
  showpass: boolean = false;
  _RestPassword = inject(RestPassword);
  _ToastService = inject(ToastService);
  _Router = inject(Router);

  loading = signal(false);
  success = signal(false);
  errorMessage = signal('');

  showFunc() {
    this.showpass = !this.showpass;
  }
  passwordModel = signal({
    password: '',
    confirmPassword: ''
  });

  passwordForm = form(this.passwordModel, (field) => {

    // Required
    required(field.password, {
      message: 'Password is required'
    });

    required(field.confirmPassword, {
      message: 'Please confirm your password'
    });

    // 8 - 64 characters
    minLength(field.password, 8, {
      message: 'Password must be at least 8 characters'
    });

    maxLength(field.password, 64, {
      message: 'Password must not exceed 64 characters'
    });

    // Uppercase letter
    pattern(field.password, /[A-Z]/, {
      message: 'Password must contain at least one uppercase letter'
    });

    // Lowercase letter
    pattern(field.password, /[a-z]/, {
      message: 'Password must contain at least one lowercase letter'
    });

    // At least one digit
    pattern(field.password, /[0-9]/, {
      message: 'Password must contain at least one number'
    });

    // Special character
    pattern(field.password, /[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character'
    });

  });


  ngOnInit() {
    const accessToken = history.state.accessToken;

    if (!accessToken) {
      this.tokenStatus.set('invalid');
      return;
    }

    // مؤقتًا لاختبار ظهور الفورم، وليس للتحقق من صلاحية التوكن
    this.tokenStatus.set('valid');
  }

  passwordChecks = computed(() => {
    const password = this.passwordModel().password;
    return {
      length: password.length >= 8 && password.length <= 64,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };
  });


  resetPass() {

    // if (this.passwordForm().invalid() || this.loading()) {
    //   return;
    // }

    const password = this.passwordModel().password;
    const confirmPassword = this.passwordModel().confirmPassword;

    const accessToken = history.state.accessToken;

    if (!accessToken) {
      this.tokenStatus.set('invalid');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this._RestPassword.sendResetPass(password, accessToken)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.success.set(true);
          this.loading.set(false);
          this._ToastService.show(
            'Your password has been updated successfully. You can now log in',
            "success"
          );
          this._Router.navigate(["/login"]);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage.set('Failed to reset password');
          this.loading.set(false);
          this._ToastService.show(
            'Failed to reset password',
            "error"
          );
        }
      });
  }

}