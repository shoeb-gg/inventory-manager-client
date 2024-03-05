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
            {
                path: 'products',
                loadChildren: () =>
                    import('./products/products.module').then(
                        (m) => m.ProductsModule
                    ),
            },
            {
                path: 'purchases',
                loadChildren: () =>
                    import('./purchases/purchases.module').then(
                        (m) => m.PurchasesModule
                    ),
            },
            {
                path: 'inventory',
                loadChildren: () =>
                    import('./inventory/inventory.module').then(
                        (m) => m.InventoryModule
                    ),
            },
            {
                path: 'utilities',
                loadChildren: () =>
                    import('./utilities/utilities.module').then(
                        (m) => m.UtilitiesModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
