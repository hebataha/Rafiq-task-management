import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { SignUpService } from '../../services/sign-up';
import { ToastService } from '../../../../shared/services/toast';

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-sign-up',
  styleUrl: './sign-up.css',
  templateUrl: './sign-up.html',
})

export class SignUp {
  _SignUpService = inject(SignUpService);
  _ToastService = inject(ToastService);
  _Router = inject(Router)

  showPass: boolean = false;
  loading: boolean = false;
  signUpForm = signal({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: ""

  })
  toggleShowPass() {
    return this.showPass = !this.showPass;
  }

  registerForm = form(this.signUpForm, (fields) => {
    required(fields.name, { message: "name is required" });
    required(fields.email, { message: "email is required" });
    email(fields.email, { message: "please enter a vaild email" });
    required(fields.password, { message: "password is required" });
    minLength(fields.password, 8, {
      message: "Password must be at least 8 characters"
    });
    maxLength(fields.password, 64, {
      message: "Password must not exceed 64 characters"
    });
    pattern(
      fields.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,64}$/,
      {
        message:
          "Password must include uppercase, lowercase, number, special character, and no spaces"
      }
    );
    required(fields.confirmPassword, { message: "confirmPassword is required" });
    minLength(fields.name, 3, { message: "min charcters of name should me at leaset 3 charcters" });
    maxLength(fields.name, 50, { message: "max charcters of name should me at leaset 50 charcters" });
    pattern(fields.name, /^\p{L}+(?: \p{L}+)*$/u, {
      message: 'Name can contain letters and single spaces only'
    });


  })

  hasMinLength() {
    return this.signUpForm().password.length >= 8;
  }
  hasUpperLowerDigit() {
    const password = this.signUpForm().password;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    return hasUppercase && hasLowercase && hasDigit;
  }
  hasSpecialCharacter() {
    const password = this.signUpForm().password;

    return /[!@#$%^&*]/.test(password);
  }



  signUp() {
    const name = this.signUpForm().name;
    const email = this.signUpForm().email;
    const password = this.signUpForm().password;
    const confirmPassword = this.signUpForm().confirmPassword;
    const jobTitle = this.signUpForm().jobTitle;
    const data = {
      "name": name,
      "job_title": jobTitle
    }

    if (password !== confirmPassword) {
      return;
    }
    this.loading = true;
    this._SignUpService.signUp(email, password, data).subscribe({
      next: (res: any) => {
        console.log("signup", res);
        this.loading = false;
        this._ToastService.show(
          'account created succefully',
          "success"
        ),
          this._Router.navigate(['/login']);


      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
        this._ToastService.show(
          'something went error',
          "error"
        )


      }
    })
  }
}
