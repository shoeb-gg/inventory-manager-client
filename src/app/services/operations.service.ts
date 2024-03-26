import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseModel } from '../common/models/Response_Model';

@Injectable({
    providedIn: 'root',
})
export class OperationsService {
    constructor(private readonly http: HttpClient) {}

    public apiUrl = window['__env']['apiUrl'];

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

    getAllOperators() {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.get(this.apiUrl + 'operators/all/' + businessId);
    }

    createOperator(operatorInfo) {
        let businessId = localStorage.getItem('selectedBusinessId');

        return this.http.post<ResponseModel>(
            this.apiUrl + 'operators/' + businessId,
            operatorInfo
        );
    }
}
