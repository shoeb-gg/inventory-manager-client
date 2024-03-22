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
    selector: 'app-operation-details',
    templateUrl: './operation-details.component.html',
    styleUrls: ['./operation-details.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class OperationDetailsComponent implements OnInit, OnDestroy {
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

    operationForm: FormGroup;
    public loading: boolean = false;

    public products: any[];
    public sellers: any[];

    public selectedproduct: any;
    public productFilterValue: any;

    ngOnInit(): void {
        this.loading = true;

        this.operationForm = this.formBuilder.group({
            product: [null, Validators.required],
            seller: [null],
            quantity: [null, Validators.required],
            description: [null],
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
