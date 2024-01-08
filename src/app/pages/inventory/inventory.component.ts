import { Component } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
    providers: [DialogService],
})
export class InventoryComponent {
    constructor(private readonly dialogService: DialogService) {
        // this.openNewProductDialog();
    }

    public inventory = [
        {
            name: 'Product 1',
            stock: 58,
            quantityType: 'Kg',
        },
        {
            name: 'Product 2',
            stock: 420,
            quantityType: 'L',
        },
        {
            name: 'Product 1',
            stock: 666,
            quantityType: 'Oz',
        },
    ];
}
