import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastService } from 'src/app/services/toast.service';
import { BusinessService } from 'src/app/services/business.service';

@Component({
    selector: 'app-business-details',
    templateUrl: './business-details.component.html',
    styleUrls: ['./business-details.component.scss'],
})
export class BusinessDetailsComponent implements OnInit {
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly toast: ToastService,
        private readonly business: BusinessService
    ) {}

    businessForm: FormGroup;

    ngOnInit(): void {
        this.businessForm = this.formBuilder.group({
            name: ['', Validators.required],
            type_of_business: ['', Validators.required],
            address: ['', Validators.required],
            description: [''],
        });
    }

    createBusiness() {
        if (this.businessForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });

            return;
        }
        console.log(this.businessForm.status);

        this.business.createBusiness(this.businessForm.value).subscribe((r) => {
            console.log(r);
        });
    }
}
