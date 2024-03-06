import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { PurchasesService } from 'src/app/services/purchases.service';
import { SellerDetailsComponent } from 'src/app/shared/dialog/seller-details/seller-details.component';

@Component({
    selector: 'app-sellers',
    templateUrl: './sellers.component.html',
    styleUrls: ['./sellers.component.scss'],
    providers: [DialogService],
})
export class SellersComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly purchases: PurchasesService,
        private readonly dialogService: DialogService
    ) {}

    public sellers = [];
    public ref: DynamicDialogRef;

    ngOnInit(): void {
        this.loadSellers();
    }

    loadSellers() {
        this.purchases
            .getAllSellers()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                this.sellers = r;
            });
    }

    openNewSellerDialog() {
        this.ref = this.dialogService.open(SellerDetailsComponent, {
            header: 'Register a new Supplier',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });
        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadSellers();
        });
    }

    openEditSellerDialog(seller) {
        this.ref = this.dialogService.open(SellerDetailsComponent, {
            header: seller.name,
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: seller,
        });
        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadSellers();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
