import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { OperationsService } from 'src/app/services/operations.service';

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
        private readonly operations: OperationsService
    ) {}

    public operationCategories = [];
    public loading = false;
    public ref: DynamicDialogRef;

    ngOnInit(): void {
        this.loading = true;
        this.loadOperationCategories();
    }

    loadOperationCategories() {
        this.operations
            .getAllOperationCategories()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                this.operationCategories = r;
                this.loading = false;
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
