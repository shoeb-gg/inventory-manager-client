import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
    declarations: [InventoryComponent],
    imports: [
        CommonModule,
        InventoryRoutingModule,
        ButtonModule,
        TableModule,
        TreeTableModule,
    ],
})
export class InventoryModule {}
