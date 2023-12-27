import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResponseModel } from '../common/models/Response_Model';

@Injectable({
    providedIn: 'root',
})
export class BusinessService {
    constructor(private readonly http: HttpClient) {}

    public apiUrl = window['__env']['apiUrl'] + 'business';

    createBusiness(businessInfo) {
        return this.http.post<ResponseModel>(this.apiUrl, businessInfo);
    }

    getUserMultipleBusiness() {
        return this.http.get(this.apiUrl + '/all');
    }
}
