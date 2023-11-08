import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app/dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'orders',
                loadChildren: () =>
                    import('./orders/orders.module').then(
                        (m) => m.OrdersModule
                    ),
            },
            {
                path: 'stock',
                loadChildren: () =>
                    import('./stock/stock.module').then((m) => m.StockModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
