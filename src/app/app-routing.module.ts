import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { authGuard } from './core/utils/auth.guard';
import { WakeServerComponent } from './wake-server/wake-server.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/wake-server',
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
    {
        path: 'wake-server',
        component: WakeServerComponent,
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
