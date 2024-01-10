import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    public apiUrl = window['__env']['apiUrl'] + 'auth/';

    login(username: string, password: string) {
        return this.http.post(this.apiUrl + 'login', {
            username: username,
            password: password,
        });
    }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigateByUrl('auth/login');
    }

    verifyToken() {
        return this.http.get<ResponseModel>(this.apiUrl + 'verify');
    }
}
