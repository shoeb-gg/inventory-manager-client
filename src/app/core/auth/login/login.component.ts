import { Component } from '@angular/core';

import { LayoutService } from 'src/app/services/layout.service';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
        private readonly auth: AuthService,
        private readonly router: Router
    ) {}

    login() {
        this.auth.login(this.username, this.password).subscribe((r: any) => {
            if (r) {
                localStorage.setItem('access_token', r.access_token);
                this.router.navigateByUrl('app');
            }
        });
    }
}
