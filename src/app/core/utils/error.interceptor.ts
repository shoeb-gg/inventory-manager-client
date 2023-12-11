import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private readonly auth: AuthService,
        private readonly toast: ToastService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.error.statusCode === 401) {
                    this.toast.errorToast.next({
                        severity: 'error',
                        detail: err.error.message,
                    });

                    this.auth.logout();
                } else {
                    this.toast.errorToast.next({
                        severity: 'error',
                        detail: err.error.message,
                    });
                }
                return throwError(() => new Error(err));
            })
        );
    }
}
