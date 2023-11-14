import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllProductsComponent } from './all-products/all-products.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app/products/all',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ProductsComponent,
        children: [
            {
                path: 'all',
                component: AllProductsComponent,
            },
            {
                path: 'categories',
                component: CategoriesComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
