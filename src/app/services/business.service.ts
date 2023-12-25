import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class BusinessService {
    constructor(private readonly http: HttpClient) {}

    createBusiness(businessInfo) {
        return this.http.post('sdcsc', businessInfo);
    }
}
