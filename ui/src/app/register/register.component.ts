import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    email: string = '';
    password: string = '';
    role: string = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.signup(this.email, this.password).pipe(
            switchMap(response => {
                this.toastr.success('Signup successful!', 'Success');
                this.router.navigate(['/login']);
                return of(response);
            }),
            catchError(error => {
                this.toastr.error('Signup failed. Please try again.', 'Error');
                return of(null);
            })
        ).subscribe();
    }
}
