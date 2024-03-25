import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ToastService } from 'src/app/services/toast.service';
import { PurchasesService } from 'src/app/services/purchases.service';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Component({
    selector: 'app-operator-details',
    templateUrl: './operator-details.component.html',
    styleUrls: ['./operator-details.component.scss'],
})
export class OperatorDetailsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly toast: ToastService,
        public config: DynamicDialogConfig,
        private readonly ref: DynamicDialogRef,
        private readonly purchases: PurchasesService
    ) {}

    OperatorForm: FormGroup;

    ngOnInit(): void {
        this.OperatorForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            phone: ['', Validators.required],
            address: [''],
        });
    }

    createOperator() {
        if (this.OperatorForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });
            return;
        }

        this.purchases
            .createOperator(this.OperatorForm.value)
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
