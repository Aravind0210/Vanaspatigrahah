import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username: string = 'admin';
  password: string = 'admin';

  constructor(private router: Router) {}

  onSubmit() {
    // Add authentication logic here
    console.log('Login attempt:', this.username);
    // Redirect to home after successful login
    this.router.navigate(['/addshop']);
  }
}
