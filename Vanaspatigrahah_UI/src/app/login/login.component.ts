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
  selectedBranch: string = '';

  private branchPasswords: { [key: string]: string } = {
    branch1: 'pass1',
    branch2: 'pass2',
    branch3: 'pass3'
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (
      this.enteredUsername.trim().toLowerCase() === 'admin' &&
      this.selectedBranch &&
      this.enteredPassword === this.branchPasswords[this.selectedBranch]
    ) {
      console.log('Login successful');
      this.router.navigate(['/billing-summary']);
    } else {
      alert('Invalid username, branch or password. Please try again.');
    }
  }
}
