import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseModel } from '../common/models/Response_Model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private readonly http: HttpClient) {}

    public apiUrl = window['__env']['apiUrl'] + 'products/';

    getAllproducts() {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.get(this.apiUrl + 'all/' + businessId);
    }

    getproduct(productId) {
        return this.http.get(this.apiUrl + productId);
    }

    createProducts(productInfo) {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.post<ResponseModel>(
            this.apiUrl + businessId,
            productInfo
        );
    }

    updateProducts(productId: string, productInfo) {
        return this.http.put<ResponseModel>(
            this.apiUrl + productId,
            productInfo
        );
    }

    deleteProduct(productId) {
        return this.http.delete<ResponseModel>(this.apiUrl + productId);
    }
}
