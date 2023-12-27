import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ToastService } from 'src/app/services/toast.service';
import { BusinessService } from 'src/app/services/business.service';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Component({
    selector: 'app-business-details',
    templateUrl: './business-details.component.html',
    styleUrls: ['./business-details.component.scss'],
})
export class BusinessDetailsComponent implements OnInit {
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly toast: ToastService,
        private readonly business: BusinessService,
        private readonly config: DynamicDialogConfig,
        private readonly ref: DynamicDialogRef
    ) {}

    businessForm: FormGroup;

    ngOnInit(): void {
        console.log(this.config.data);

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

        this.business
            .createBusiness(this.businessForm.value)
            .subscribe((r: ResponseModel) => {
                if (r.status === 201) {
                    this.toast.successToast.next({
                        severity: 'success',
                        detail: r.message,
                    });
                }
                this.ref.close(1);
            });
    }
}
