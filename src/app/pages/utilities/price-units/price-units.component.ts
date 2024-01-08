import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { UtilitiesService } from 'src/app/services/utilities.service';
import { PriceDetailsComponent } from 'src/app/shared/dialog/price-details/price-details.component';

@Component({
    selector: 'app-price-units',
    templateUrl: './price-units.component.html',
    styleUrls: ['./price-units.component.scss'],
    providers: [DialogService],
})
export class PriceUnitsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly utilities: UtilitiesService,
        private readonly dialogService: DialogService
    ) {}

    public prices = [];
    public ref: DynamicDialogRef;

    ngOnInit(): void {
        this.loadPrices();
    }

    loadPrices() {
        this.utilities
            .getAllPrices()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                this.prices = r;
            });
    }

    openNewPriceDialog() {
        this.ref = this.dialogService.open(PriceDetailsComponent, {
            header: 'Create a new Price Units',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadPrices();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
