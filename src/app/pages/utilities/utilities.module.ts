import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';

import { UtilitiesRoutingModule } from './utilities-routing.module';

import { UtilitiesComponent } from './utilities.component';
import { QuantityTypesComponent } from './quantity-types/quantity-types.component';

@NgModule({
    declarations: [UtilitiesComponent, QuantityTypesComponent],
    imports: [
        CommonModule,
        UtilitiesRoutingModule,
        ButtonModule,
        TableModule,
        TreeTableModule,
    ],
})
export class UtilitiesModule {}
