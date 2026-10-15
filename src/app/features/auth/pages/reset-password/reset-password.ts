import { Component, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  form,
  required,
  minLength,
  maxLength,
  pattern,
  validate,
  FormField
} from '@angular/forms/signals';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink,FormField],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  tokenStatus = signal<'checking' | 'valid' | 'invalid'>('checking');

  passwordModel = signal({
    password: '',
    confirmPassword: ''
  });
  passwordForm = form(this.passwordModel, (field) => {

    // Required
    required(field.password ,{message:"requried"});
    required(field.confirmPassword);

    // 8 - 64 characters
    minLength(field.password, 8);
    maxLength(field.password, 64);

    // Uppercase letter
    pattern(field.password, /[A-Z]/);

    // Lowercase letter
    pattern(field.password, /[a-z]/);

    // At least one digit
    pattern(field.password, /[0-9]/);

    // Special character
    pattern(field.password, /[^A-Za-z0-9]/);

    // Confirm Password
    validate(field.confirmPassword, ({ value, valueOf }) => {
      if (value() !== valueOf(field.password)) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match'
        };
      }

      return null;
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
}