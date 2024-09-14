import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    email: string = '';
    password: string = '';
    isLoginMode = true;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastService: ToastService
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        if (this.isLoginMode) {
            this.authService.login(email, password).subscribe(
                response => {
                    this.isLoading = false;
                    this.toastService.showSuccess('Login successful!', 'Success');
                    this.router.navigate(['/employees-list']); // Redirect to employees list page
                },
                error => {
                    this.isLoading = false;
                    this.toastService.showError('Login failed. Please try again.', 'Error');
                }
            );
        } else {
            const role = form.value.role;
            this.authService.signup(email, password).subscribe(
                response => {
                    this.isLoading = false;
                    this.toastService.showSuccess('Signup successful!', 'Success');
                    this.router.navigate(['/employees-list']); // Redirect to employees list page
                },
                error => {
                    this.isLoading = false;
                    this.toastService.showError('Signup failed. Please try again.', 'Error');
                }
            );
        }

        form.reset();
    }
}
