import { Component } from '@angular/core';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
    public value;
    public quantityTypes = ['Kg', 'Lb', 'Oz'];
    public quantityType: any | null;

    public priceUnits = ['BDT', 'USD', 'EUR'];
    public priceUnit: any;

    public enableOperation: any | null;

    onCategoryClear() {
        console.log(this.quantityType);
        this.quantityType = null;
    }
}
