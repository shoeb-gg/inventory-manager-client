import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { LayoutService } from 'src/app/services/layout.service';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    username: string;
    password: string;

    constructor(
        public layoutService: LayoutService,
        private readonly auth: AuthService,
        private readonly router: Router
    ) {}

    login() {
        this.auth
            .login(this.username, this.password)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r) {
                    localStorage.setItem('access_token', r.access_token);
                    this.router.navigateByUrl('select-business');
                }
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
