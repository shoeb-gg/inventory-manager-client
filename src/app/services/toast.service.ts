import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor() {}

    public successToast = new BehaviorSubject<{
        severity: string;
        detail: string;
    } | null>(null);

    public errorToast = new BehaviorSubject<{
        severity: string;
        detail: string;
    } | null>(null);
}
