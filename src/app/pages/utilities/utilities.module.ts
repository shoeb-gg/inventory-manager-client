import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';

import { UtilitiesRoutingModule } from './utilities-routing.module';

import { UtilitiesComponent } from './utilities.component';
import { QuantityTypesComponent } from './quantity-types/quantity-types.component';
import { PriceUnitsComponent } from './price-units/price-units.component';

@NgModule({
    declarations: [UtilitiesComponent, QuantityTypesComponent, PriceUnitsComponent],
    imports: [
        CommonModule,
        UtilitiesRoutingModule,
        ButtonModule,
        TableModule,
        TreeTableModule,
    ],
})
export class UtilitiesModule {}
