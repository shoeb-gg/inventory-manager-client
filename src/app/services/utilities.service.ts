import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseModel } from '../common/models/Response_Model';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    constructor(private readonly http: HttpClient) {}

    public apiUrl = window['__env']['apiUrl'];

    getAllQuantities() {
        return this.http.get(this.apiUrl + 'quantity/all');
    }

    createQuantity(quantityDetails) {
        return this.http.post<ResponseModel>(
            this.apiUrl + 'quantity',
            quantityDetails
        );
    }

    getAllPrices() {
        return this.http.get(this.apiUrl + 'price/all');
    }

    createPrice(priceDetails) {
        return this.http.post<ResponseModel>(
            this.apiUrl + 'price',
            priceDetails
        );
    }
}
