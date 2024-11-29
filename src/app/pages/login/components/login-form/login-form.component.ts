import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    remember: new FormControl<boolean>(false),
  });

  @Output() login = new EventEmitter<LoginForm>();

  onSubmit() {
    this.login.emit(this.loginForm.value);
    console.log(this.loginForm.value);
  }
}
