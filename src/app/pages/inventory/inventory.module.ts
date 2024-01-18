import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    declarations: [InventoryComponent],
    imports: [
        CommonModule,
        InventoryRoutingModule,
        ButtonModule,
        TableModule,
        TreeTableModule,
        InputNumberModule,
        FormsModule,
        ProgressSpinnerModule,
    ],
})
export class InventoryModule {}
