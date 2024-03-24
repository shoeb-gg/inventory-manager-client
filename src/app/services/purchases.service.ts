import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseModel } from '../common/models/Response_Model';

@Injectable({
    providedIn: 'root',
})
export class PurchasesService {
    constructor(private readonly http: HttpClient) {}

    public apiUrl = window['__env']['apiUrl'];

    getAllSellers() {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.get(this.apiUrl + 'seller/all/' + businessId);
    }

    createSeller(sellerInfo) {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.post<ResponseModel>(
            this.apiUrl + 'seller/' + businessId,
            sellerInfo
        );
    }

    updateSeller(sellerId: string, sellerInfo) {
        return this.http.put<ResponseModel>(
            this.apiUrl + 'seller/' + sellerId,
            sellerInfo
        );
    }

    deleteSeller(sellerId: string) {
        return this.http.delete<ResponseModel>(
            this.apiUrl + 'seller/' + sellerId
        );
    }

    getAllPurchases() {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.get(this.apiUrl + 'purchase/all/' + businessId);
    }

    createPurchase(purchaseInfo) {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.post<ResponseModel>(
            this.apiUrl + 'purchase/' + businessId,
            purchaseInfo
        );
    }

    updatePurchase(purchaseId: string, purchaseInfo) {
        return this.http.put<ResponseModel>(
            this.apiUrl + 'purchase/' + purchaseId,
            purchaseInfo
        );
    }

    getAllOperationCategories() {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.get(
            this.apiUrl + 'operations-category/all/' + businessId
        );
    }

    createOperationCategories(operationCategoriesInfo) {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.post<ResponseModel>(
            this.apiUrl + 'operations-category/' + businessId,
            operationCategoriesInfo
        );
    }
}
