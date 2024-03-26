import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { OperationsService } from 'src/app/services/operations.service';

import { OperatorDetailsComponent } from 'src/app/shared/dialog/operator-details/operator-details.component';

@Component({
    selector: 'app-operators',
    templateUrl: './operators.component.html',
    styleUrls: ['./operators.component.scss'],
    providers: [DialogService],
})
export class OperatorsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly dialogService: DialogService,
        private readonly operations: OperationsService
    ) {}

    public operators = [];
    public loading = false;
    public ref: DynamicDialogRef;

    ngOnInit(): void {
        this.loadOperators();
        this.openNewOperatorDialog();
    }

    loadOperators() {
        this.loading = true;

        this.operations
            .getAllOperators()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                this.operators = r;
                this.loading = false;
            });
    }
    openNewOperatorDialog() {
        this.ref = this.dialogService.open(OperatorDetailsComponent, {
            header: 'Register a new Operator',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadOperators();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
