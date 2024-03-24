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
import { AccordionModule } from 'primeng/accordion';

import { AppMenuitemComponent } from './app.menuitem.component';
import { ProductDetailsComponent } from './dialog/product-details/product-details.component';
import { BusinessDetailsComponent } from './dialog/business-details/business-details.component';
import { QuantityDetailsComponent } from './dialog/quantity-details/quantity-details.component';
import { PriceDetailsComponent } from './dialog/price-details/price-details.component';
import { CategoryDetailsComponent } from './dialog/category-details/category-details.component';
import { SellerDetailsComponent } from './dialog/seller-details/seller-details.component';
import { PurchaseDetailsComponent } from './dialog/purchase-details/purchase-details.component';
import { OperationDetailsComponent } from './dialog/operation-details/operation-details.component';
import { OperationCategorieDetailsComponent } from './dialog/operation-categorie-details/operation-categorie-details.component';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        ProductDetailsComponent,
        BusinessDetailsComponent,
        QuantityDetailsComponent,
        PriceDetailsComponent,
        CategoryDetailsComponent,
        SellerDetailsComponent,
        PurchaseDetailsComponent,
        OperationDetailsComponent,
        OperationCategorieDetailsComponent,
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
        AccordionModule,
    ],
    exports: [AppMenuitemComponent],
})
export class SharedModule {}
