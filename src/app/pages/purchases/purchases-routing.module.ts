import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchasesComponent } from './purchases.component';
import { AllPurchasesComponent } from './all-purchases/all-purchases.component';
import { SellersComponent } from './sellers/sellers.component';

const routes: Routes = [
    {
        path: '',
        component: PurchasesComponent,
        children: [
            {
                path: 'all',
                component: AllPurchasesComponent,
            },
            {
                path: 'suppliers',
                component: SellersComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PurchasesRoutingModule {}
