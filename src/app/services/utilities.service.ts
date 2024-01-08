import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseModel } from '../common/models/Response_Model';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    constructor(private readonly http: HttpClient) {}

    public apiUrl = window['__env']['apiUrl'] + 'quantity';

    getAllQuantities() {
        return this.http.get(this.apiUrl + '/all');
    }

    createQuantity(quantityDetails) {
        return this.http.post<ResponseModel>(this.apiUrl, quantityDetails);
    }
}
