import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';

import { AppMenuitemComponent } from './app.menuitem.component';
import { ProductDetailsComponent } from './dialog/product-details/product-details.component';
import { BusinessDetailsComponent } from './dialog/business-details/business-details.component';
import { QuantityDetailsComponent } from './dialog/quantity-details/quantity-details.component';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        ProductDetailsComponent,
        BusinessDetailsComponent,
        QuantityDetailsComponent,
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
    ],
    exports: [AppMenuitemComponent],
})
export class SharedModule {}
