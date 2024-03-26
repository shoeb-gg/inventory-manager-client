import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import { OperationsService } from 'src/app/services/operations.service';
import { ProductsService } from 'src/app/services/products.service';

import { OperationDetailsComponent } from 'src/app/shared/dialog/operation-details/operation-details.component';

@Component({
    selector: 'app-all-operations',
    templateUrl: './all-operations.component.html',
    styleUrls: ['./all-operations.component.scss'],
    providers: [DialogService],
})
export class AllOperationsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly dialogService: DialogService,
        private readonly operations: OperationsService,
        private readonly product: ProductsService
    ) {}

    public loading: boolean = false;
    public ref: DynamicDialogRef;

    public allOperations: any[] = [];

    public operation_categories: any[];
    public products: any[];
    public operators: any[];

    ngOnInit(): void {
        this.loading = true;
        this.loadOptionsData();
    }

    loadOptionsData() {
        forkJoin({
            operation_categories: this.operations.getAllOperationCategories(),
            operators: this.operations.getAllOperators(),
            products: this.product.getAllproducts(),
        })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r) {
                    this.operation_categories = r.operation_categories;
                    this.operators = r.operators;
                    this.products = r.products;

                    // this.openNewOperationDialog();

                    this.loading = false;
                } else {
                    this.loading = false;
                }
            });
    }

    openNewOperationDialog() {
        this.ref = this.dialogService.open(OperationDetailsComponent, {
            header: 'Start a New Operation',
            width: '95%',
            height: '95%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
                operation_categories: this.operation_categories,
                operators: this.operators,
                products: this.products,
            },
        });

        this.ref.onClose
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                if (r) {
                    this.loading = true;
                    // this.loadPurchases();
                }
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
