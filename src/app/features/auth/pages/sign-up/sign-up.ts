import { Component, signal } from '@angular/core';
import { email, form, FormField, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-sign-up',
  styleUrl: './sign-up.css',
  templateUrl: './sign-up.html',
})

export class SignUp {
  signUpForm = signal({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: ""

  })

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
}
