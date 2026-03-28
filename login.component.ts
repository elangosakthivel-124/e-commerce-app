import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const success = this.auth.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/products']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
  login() {
  this.auth.login({ email: this.email, password: this.password })
    .subscribe({
      next: (res) => {
        this.auth.saveToken(res.access_token);
        this.router.navigate(['/products']);
      },
      error: () => {
        this.error = 'Invalid credentials';
      }
    });
}
}
