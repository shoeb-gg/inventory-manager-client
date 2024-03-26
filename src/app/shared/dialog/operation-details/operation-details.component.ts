import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public sendArray?: FormArray;
    public receiveArray?: FormArray;
    public pendingArray?: FormArray;

    public loading: boolean = false;

    public operation_categories: any[];
    public products: any[];
    public operators: any[];

    public selectedproduct: any;
    public productFilterValue: any;

    ngOnInit(): void {
        this.loading = true;

        console.log(this.config.data);

        this.operation_categories = this.config.data.operation_categories;
        this.products = this.config.data.products;
        this.operators = this.config.data.operators;

        this.operationForm = this.formBuilder.group({
            name: [null, Validators.required],
            operation_category: [null, Validators.required],
            operator: [null, Validators.required],
            description: [null],
            status: ['In Progress', Validators.required],
            send_operation: this.formBuilder.array([], Validators.required),
            receive_operation: this.formBuilder.array([], Validators.required),
            pending_operation: this.formBuilder.array([]),
        });

        this.sendArray = this.operationForm.get('send_operation') as FormArray;
        this.receiveArray = this.operationForm.get(
            'receive_operation'
        ) as FormArray;
        this.pendingArray = this.operationForm.get(
            'pending_operation'
        ) as FormArray;

        this.increaseSendField();
        this.increaseReceiveField();
        this.increasePendingField();
    }

    increaseSendField() {
        const f = this.formBuilder.group({
            product: ['', Validators.required],
            quantity: ['', Validators.required],
            date: ['', Validators.required],
            cost: [null],
        });
        (this.operationForm.get('send_operation') as FormArray).push(f);
    }
    decreaseSendField() {
        this.sendArray?.removeAt(this.sendArray.length - 1);
    }

    increaseReceiveField() {
        const f = this.formBuilder.group({
            product: ['', Validators.required],
            quantity: ['', Validators.required],
            date: ['', Validators.required],
            cost: [null],
        });
        (this.operationForm.get('receive_operation') as FormArray).push(f);
    }
    decreaseReceiveField() {
        this.receiveArray?.removeAt(this.receiveArray.length - 1);
    }

    increasePendingField() {
        const f = this.formBuilder.group({
            product: [''],
            quantity: [''],
            date: [''],
            cost: [null],
        });
        (this.operationForm.get('pending_operation') as FormArray).push(f);
    }
    decreasePendingField() {
        this.pendingArray?.removeAt(this.pendingArray.length - 1);
    }

    createOperation() {
        console.log(this.operationForm.value);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
