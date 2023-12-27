import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ToastService } from 'src/app/services/toast.service';
import { BusinessService } from 'src/app/services/business.service';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Component({
    selector: 'app-business-details',
    templateUrl: './business-details.component.html',
    styleUrls: ['./business-details.component.scss'],
})
export class BusinessDetailsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly toast: ToastService,
        private readonly business: BusinessService,
        public config: DynamicDialogConfig,
        private readonly ref: DynamicDialogRef
    ) {}

    businessForm: FormGroup;

    ngOnInit(): void {
        this.businessForm = this.formBuilder.group({
            name: ['', Validators.required],
            type_of_business: ['', Validators.required],
            address: ['', Validators.required],
            description: [''],
        });

        if (this.config.data) {
            this.loadData();
        }
    }

    loadData() {
        this.business
            .getBusinessDetails(this.config.data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                if (r) {
                    this.businessForm.patchValue(r);
                }
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

        this.business
            .createBusiness(this.businessForm.value)
            .pipe(takeUntil(this._unsubscribeAll))
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

    updateBusiness() {
        if (this.businessForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });

            return;
        }

        this.business
            .updateBusiness(this.config.data, this.businessForm.value)
            .pipe(takeUntil(this._unsubscribeAll))
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

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
