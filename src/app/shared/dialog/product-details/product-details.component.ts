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
import { ProductsService } from 'src/app/services/products.service';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dialogService: DialogService,
        private readonly product: ProductsService,
        private readonly utilities: UtilitiesService,
        public config: DynamicDialogConfig,
        private readonly toast: ToastService,
        private readonly ref: DynamicDialogRef,
        private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService
    ) {}

    productForm: FormGroup;
    public loading: boolean = false;

    public categories: any[];
    public quantity_types: any[];
    public price_units: any[];

    ngOnInit(): void {
        this.loading = true;

        this.productForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            price_amount: [''],
            enable_operation: [false],
            quantity_type: ['', Validators.required],
            price_unit: ['', Validators.required],
            category: [''],
            subcategory: [''],
        });

        this.loadUtilities();
    }

    loadUtilities() {
        forkJoin({
            categories: this.utilities.getAllCategories(),
            quantity_types: this.utilities.getAllQuantities(),
            price_units: this.utilities.getAllPrices(),
        })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                this.categories = r.categories;
                this.quantity_types = r.quantity_types;
                this.price_units = r.price_units;

                if (this.config.data) {
                    this.prepareProduct();
                }
                this.loading = false;
            });
    }

    prepareProduct() {
        this.product
            .getproduct(this.config.data.id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((x: any) => {
                if (x) {
                    let category = this.categories.find((cat) => {
                        return x.category === cat.id;
                    });

                    let subcategory = category?.SUB_CATEGORIES.find((scat) => {
                        return x.subcategory === scat.id;
                    });

                    let quantity_type = this.quantity_types.find((quan) => {
                        return x.quantity_type === quan.id;
                    });

                    let price_unit = this.price_units.find((price) => {
                        return x.price_unit === price.id;
                    });

                    let prod = {
                        name: x.name,
                        description: x.description,
                        price_amount: x.price_amount,
                        enable_operation: x.enable_operation,
                        category: category ? category : null,
                        subcategory: subcategory ? subcategory : null,
                        quantity_type: quantity_type,
                        price_unit: price_unit,
                    };

                    this.productForm.patchValue({ ...prod });

                    this.loading = false;
                }
            });
    }

    updateProduct() {
        if (this.productForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });

            return;
        }

        let updatedProduct = {
            ...this.productForm.value,
            price_amount: this.productForm.value.price_amount
                ? parseFloat(this.productForm.value.price_amount)
                : null,
            price_unit: this.productForm.value.price_unit
                ? this.productForm.value.price_unit.id
                : null,
            quantity_type: this.productForm.value.quantity_type
                ? this.productForm.value.quantity_type.id
                : null,
            category: this.productForm.value.category
                ? this.productForm.value.category.id
                : null,
            subcategory: this.productForm.value.subcategory
                ? this.productForm.value.subcategory.id
                : null,
        };

        this.product
            .updateProducts(this.config.data.id, updatedProduct)
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

    deleteProduct(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this product?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
                this.product
                    .deleteProduct(this.config.data.id)
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
            },
            reject: () => {},
        });
    }

    createProduct() {
        if (this.productForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });

            return;
        }

        let newProduct = {
            ...this.productForm.value,
            price_amount: this.productForm.value.price_amount
                ? parseFloat(this.productForm.value.price_amount)
                : null,
            price_unit: this.productForm.value.price_unit
                ? this.productForm.value.price_unit.id
                : null,
            quantity_type: this.productForm.value.quantity_type
                ? this.productForm.value.quantity_type.id
                : null,
            category: this.productForm.value.category
                ? this.productForm.value.category.id
                : null,
            subcategory: this.productForm.value.subcategory
                ? this.productForm.value.subcategory.id
                : null,
        };

        this.product
            .createProducts(newProduct)
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
