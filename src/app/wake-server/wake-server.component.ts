import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

import { AuthService } from '../core/auth/auth.service';

import { ResponseModel } from '../common/models/Response_Model';

@Component({
    selector: 'app-wake-server',
    templateUrl: './wake-server.component.html',
    styleUrls: ['./wake-server.component.scss'],
})
export class WakeServerComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly auth: AuthService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.auth
            .verifyToken()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: ResponseModel) => {
                if (r.status === 200) {
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
