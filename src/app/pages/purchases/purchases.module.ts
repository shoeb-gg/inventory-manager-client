import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { PurchasesComponent } from './purchases.component';
import { AllPurchasesComponent } from './all-purchases/all-purchases.component';
import { SellersComponent } from './sellers/sellers.component';

@NgModule({
    declarations: [PurchasesComponent, AllPurchasesComponent, SellersComponent],
    imports: [
        CommonModule,
        PurchasesRoutingModule,
        ButtonModule,
        TableModule,
        ProgressSpinnerModule,
    ],
})
export class PurchasesModule {}
