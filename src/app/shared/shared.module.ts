import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppMenuitemComponent } from './app.menuitem.component';
import { ProductDetailsComponent } from './dialog/product-details/product-details.component';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [AppMenuitemComponent, ProductDetailsComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        InputTextModule,
        DropdownModule,
        InputTextareaModule,
        InputSwitchModule,
        ButtonModule,
    ],
    exports: [AppMenuitemComponent],
})
export class SharedModule {}
