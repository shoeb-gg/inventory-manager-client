import { Component } from '@angular/core';

import { LayoutService } from 'src/app/services/layout.service';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    username: string;
    password: string;

    constructor(
        public layoutService: LayoutService,
        private readonly auth: AuthService
    ) {}

    login() {
        this.auth.login('admin', 'sectumsempra').subscribe((r: any) => {
            localStorage.setItem('access_token', r.access_token);
        });
    }
}
