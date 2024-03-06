import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AppMenuitemComponent } from './app.menuitem.component';
import { ProductDetailsComponent } from './dialog/product-details/product-details.component';
import { BusinessDetailsComponent } from './dialog/business-details/business-details.component';
import { QuantityDetailsComponent } from './dialog/quantity-details/quantity-details.component';
import { PriceDetailsComponent } from './dialog/price-details/price-details.component';
import { CategoryDetailsComponent } from './dialog/category-details/category-details.component';
import { SellerDetailsComponent } from './dialog/seller-details/seller-details.component';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        ProductDetailsComponent,
        BusinessDetailsComponent,
        QuantityDetailsComponent,
        PriceDetailsComponent,
        CategoryDetailsComponent,
        SellerDetailsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        InputTextModule,
        DropdownModule,
        InputTextareaModule,
        InputSwitchModule,
        ButtonModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
    ],
    exports: [AppMenuitemComponent],
})
export class SharedModule {}
