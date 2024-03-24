import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { PurchasesService } from 'src/app/services/purchases.service';

import { OperationCategorieDetailsComponent } from 'src/app/shared/dialog/operation-categorie-details/operation-categorie-details.component';

@Component({
    selector: 'app-operation-categories',
    templateUrl: './operation-categories.component.html',
    styleUrls: ['./operation-categories.component.scss'],
    providers: [DialogService],
})
export class OperationCategoriesComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly dialogService: DialogService,
        private readonly purchases: PurchasesService
    ) {}

    public operationCategories = [];
    public ref: DynamicDialogRef;

    ngOnInit(): void {
        this.loadOperationCategories();
        this.openNewOperationCategoriesDialog();
    }

    loadOperationCategories() {
        this.purchases
            .getAllOperationCategories()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                this.operationCategories = r;
            });
    }

    openNewOperationCategoriesDialog() {
        this.ref = this.dialogService.open(OperationCategorieDetailsComponent, {
            header: 'Create a new Operation Category',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadOperationCategories();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
