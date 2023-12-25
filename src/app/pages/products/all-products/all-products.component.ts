import { Component } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ProductDetailsComponent } from 'src/app/shared/dialog/product-details/product-details.component';

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.scss'],
    providers: [DialogService],
})
export class AllProductsComponent {
    constructor(private readonly dialogService: DialogService) {
        // this.openNewProductDialog();
    }

    public ref: DynamicDialogRef;

    public products = [
        {
            name: 'Product 1',
            category: 'Category 1',
            subcategory: 'SubCategory 1.1',
            price: 420,
            priceUnit: 'BDT',
            quantityType: 'Kg',
        },
        {
            name: 'Product 2',
            category: 'Category 3',
            subcategory: 'SubCategory 3.2',
            price: 420,
            priceUnit: 'BDT',
            quantityType: 'Kg',
        },
        {
            name: 'Product 3',
            category: 'Category 4',
            subcategory: 'SubCategory 4.1',
            price: 420,
            priceUnit: 'BDT',
            quantityType: 'Kg',
        },
        {
            name: 'Product 4',
            category: 'Category 2',
            subcategory: 'SubCategory 2.2',
            price: 420,
            priceUnit: 'BDT',
            quantityType: 'Kg',
        },
    ];

    openNewProductDialog() {
        this.ref = this.dialogService.open(ProductDetailsComponent, {
            header: 'Register a new Product',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });
    }
}
