import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CategoriesComponent } from './categories/categories.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [ProductsComponent, CategoriesComponent],
    imports: [CommonModule, ProductsRoutingModule, ButtonModule, TableModule],
})
export class ProductsModule {}
