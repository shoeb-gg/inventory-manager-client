import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseModel } from '../common/models/Response_Model';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    constructor(private readonly http: HttpClient) {}

    public apiUrl = window['__env']['apiUrl'] + 'inventory';

    getAllStocks() {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.get(this.apiUrl + '/all/' + businessId);
    }

    updateStocks(stockDetails) {
        return this.http.put<ResponseModel>(this.apiUrl, stockDetails);
    }
}
