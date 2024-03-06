import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import {
    ConfirmationService,
    MessageService,
    ConfirmEventType,
} from 'primeng/api';

import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';

import { ToastService } from 'src/app/services/toast.service';
import { ProductsService } from 'src/app/services/products.service';
import { PurchasesService } from 'src/app/services/purchases.service';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Component({
    selector: 'app-seller-details',
    templateUrl: './seller-details.component.html',
    styleUrls: ['./seller-details.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class SellerDetailsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dialogService: DialogService,
        public config: DynamicDialogConfig,
        private readonly toast: ToastService,
        private readonly ref: DynamicDialogRef,
        private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService,
        private readonly purchases: PurchasesService
    ) {}

    sellerForm: FormGroup;
    public loading: boolean = false;

    ngOnInit(): void {
        this.loading = true;

        this.sellerForm = this.formBuilder.group({
            name: ['', Validators.required],
            address: [''],
            description: [''],
            phone: [null, Validators.required],
        });

        if (this.config.data)
            this.sellerForm.patchValue({ ...this.config.data });
    }

    createSeller() {
        if (this.sellerForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });

            return;
        }

        this.purchases
            .createSeller(this.sellerForm.value)
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

    updateSeller() {
        if (this.sellerForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });

            return;
        }

        this.purchases
            .updateSeller(this.config.data.id, this.sellerForm.value)
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

    deleteSeller(event: Event) {
        this.purchases
            .deleteSeller(this.config.data.id)
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
