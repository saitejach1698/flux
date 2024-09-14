import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.user = {
      username: this.authService.getUsername(),
      email: this.authService.getUserEmail(),
      role: this.authService.getUserRole()
    };
  }

  navigateToEmployeesList(): void {
    this.router.navigate(['/employees-list']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
