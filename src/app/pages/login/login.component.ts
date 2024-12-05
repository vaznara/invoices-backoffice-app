import { Component } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin($event: { email: string; password: string }): void {
    this.authService
      .login($event.email, $event.password)
      .pipe(concatMap(() => this.router.navigate(['/'])))
      .subscribe();
  }
}
