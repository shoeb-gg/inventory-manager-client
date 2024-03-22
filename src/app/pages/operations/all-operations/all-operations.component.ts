import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

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
        private readonly product: ProductsService
    ) {}

    public loading: boolean = false;
    public ref: DynamicDialogRef;

    public allOperations: any[] = [];

    ngOnInit(): void {
        this.loading = true;
        // this.loadPurchases();
        this.openNewOperationDialog();
    }

    openNewOperationDialog() {
        this.ref = this.dialogService.open(OperationDetailsComponent, {
            header: 'Start a New Operation',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
                // products: this.products,
                // sellers: this.sellers,
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
