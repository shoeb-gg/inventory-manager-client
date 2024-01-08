import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ToastService } from 'src/app/services/toast.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Component({
    selector: 'app-quantity-details',
    templateUrl: './quantity-details.component.html',
    styleUrls: ['./quantity-details.component.scss'],
})
export class QuantityDetailsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly toast: ToastService,
        public config: DynamicDialogConfig,
        private readonly ref: DynamicDialogRef,
        private readonly utilities: UtilitiesService
    ) {}

    quantityForm: FormGroup;

    ngOnInit(): void {
        this.quantityForm = this.formBuilder.group({
            name: ['', Validators.required],
            abbreviation: ['', Validators.required],
        });
    }

    createQuantity() {
        if (this.quantityForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });
            return;
        }

        this.utilities
            .createQuantity(this.quantityForm.value)
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
