import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CategoriesComponent } from './categories/categories.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AllProductsComponent } from './all-products/all-products.component';

@NgModule({
    declarations: [
        ProductsComponent,
        CategoriesComponent,
        AllProductsComponent,
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ButtonModule,
        TableModule,
        TreeTableModule,
        ProgressSpinnerModule,
    ],
})
export class ProductsModule {}
