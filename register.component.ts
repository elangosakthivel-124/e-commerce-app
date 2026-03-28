import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.user);
    this.router.navigate(['/login']);
  }
  register() {
  this.auth.register(this.user).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    }
  });
}
}
