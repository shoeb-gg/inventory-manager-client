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
import { UtilitiesService } from 'src/app/services/utilities.service';
import { PurchasesService } from 'src/app/services/purchases.service';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Component({
    selector: 'app-purchase-details',
    templateUrl: './purchase-details.component.html',
    styleUrls: ['./purchase-details.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class PurchaseDetailsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dialogService: DialogService,
        private readonly purchases: PurchasesService,
        private readonly utilities: UtilitiesService,
        public config: DynamicDialogConfig,
        private readonly toast: ToastService,
        private readonly ref: DynamicDialogRef,
        private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService
    ) {}

    purchaseForm: FormGroup;
    public loading: boolean = false;

    public products: any[];
    public sellers: any[];

    public selectedproduct: any;
    public productFilterValue: any;

    ngOnInit(): void {
        this.loading = true;

        this.purchaseForm = this.formBuilder.group({
            product: [null, Validators.required],
            seller: [null],
            quantity: [null, Validators.required],
            description: [null],
        });

        this.products = this.config.data.products;
        this.sellers = this.config.data.sellers;

        if (this.config.data.purchase) {
            this.purchaseForm.patchValue(this.config.data.purchase);
        }

        this.loading = false;
    }

    createPurchase() {
        if (this.purchaseForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });

            return;
        }

        let newPurchase = {
            ...this.purchaseForm.value,
            product: this.purchaseForm.value.product.id,
            seller: this.purchaseForm.value.seller
                ? this.purchaseForm.value.seller.id
                : null,
        };

        this.purchases
            .createPurchase(newPurchase)
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

    updatePurchase() {
        console.log(this.purchaseForm.value);

        if (this.purchaseForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });

            return;
        }

        let updatedPurchase = {
            ...this.purchaseForm.value,
            product: this.purchaseForm.value.product.id,
            seller: this.purchaseForm.value.seller
                ? this.purchaseForm.value.seller.id
                : null,
        };

        this.purchases
            .updatePurchase(this.config.data.purchase.id, updatedPurchase)
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
    deletePurchase() {}

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
