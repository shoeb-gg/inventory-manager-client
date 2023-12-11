import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = async (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router: Router = inject(Router);
    const auth: AuthService = inject(AuthService);

    if (!localStorage.getItem('access_token')) {
        auth.logout();
        return false;
    } else {
        return true;
    }
};
