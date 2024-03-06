import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './purchases.component';
import { AllPurchasesComponent } from './all-purchases/all-purchases.component';
import { SellersComponent } from './sellers/sellers.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [PurchasesComponent, AllPurchasesComponent, SellersComponent],
    imports: [CommonModule, PurchasesRoutingModule, ButtonModule, TableModule],
})
export class PurchasesModule {}
