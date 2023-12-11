import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    login(username: string, password: string) {
        return this.http.post('http://localhost:6009/api/auth/login', {
            username: username,
            password: password,
        });
    }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigateByUrl('auth/login');
    }

    verifyToken() {
        return this.http.get('http://localhost:6009/api/auth/verify');
    }
}
