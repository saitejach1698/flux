import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:3003/auth';

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, {username: email, password }).pipe(
            tap(response => {
                localStorage.setItem('token', response.token); // Store the token in local storage
            })
        );
    }

    signup(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, { username:email, password }).pipe(
            tap(response => {
                localStorage.setItem('token', response.token); // Store the token in local storage
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token'); // Remove the token on logout
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getUsername(): string {
        const token = this.getToken();
        if (!token) return '';
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username;
    }

    getUserEmail(): string {
        const token = this.getToken();
        if (!token) return '';
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email;
    }

    getUserRole(): string {
        const token = this.getToken();
        if (!token) return '';
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
    }
}
