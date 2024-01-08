import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UtilitiesComponent } from './utilities.component';
import { QuantityTypesComponent } from './quantity-types/quantity-types.component';
import { PriceUnitsComponent } from './price-units/price-units.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app/utilities/quantity-types',
        pathMatch: 'full',
    },
    {
        path: '',
        component: UtilitiesComponent,
        children: [
            {
                path: 'quantity-types',
                component: QuantityTypesComponent,
            },
            {
                path: 'price-units',
                component: PriceUnitsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UtilitiesRoutingModule {}
