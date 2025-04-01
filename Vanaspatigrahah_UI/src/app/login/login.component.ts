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
  enteredUsername: string = '';
  enteredPassword: string = '';



  constructor(private router: Router) {}

  onSubmit() {
    if (this.enteredUsername.trim().toLowerCase() === 'admin' && this.enteredPassword === 'admin') {
      console.log('Login successful');
      this.router.navigate(['/addshop']);
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }
  
}
