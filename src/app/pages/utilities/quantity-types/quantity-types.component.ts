import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { UtilitiesService } from 'src/app/services/utilities.service';

import { QuantityDetailsComponent } from 'src/app/shared/dialog/quantity-details/quantity-details.component';

@Component({
    selector: 'app-quantity-types',
    templateUrl: './quantity-types.component.html',
    styleUrls: ['./quantity-types.component.scss'],
    providers: [DialogService],
})
export class QuantityTypesComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly utilities: UtilitiesService,
        private readonly dialogService: DialogService
    ) {}

    public quantities = [];
    public ref: DynamicDialogRef;

    ngOnInit(): void {
        this.loadQuantities();
    }

    loadQuantities() {
        this.utilities
            .getAllQuantities()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                this.quantities = r;
            });
    }

    openNewQuantityDialog() {
        this.ref = this.dialogService.open(QuantityDetailsComponent, {
            header: 'Register a new Business',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadQuantities();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
