import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { authGuard } from './core/utils/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/select-business',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./core/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'select-business',
        loadChildren: () =>
            import('./select-business/select-business.module').then(
                (m) => m.SelectBusinessModule
            ),
    },
    {
        path: 'app',
        loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
        canActivate: [authGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            scrollPositionRestoration: 'enabled',
            initialNavigation: 'enabledBlocking',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
