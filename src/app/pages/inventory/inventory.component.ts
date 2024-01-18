import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { ResponseModel } from 'src/app/common/models/Response_Model';

import { InventoryService } from 'src/app/services/inventory.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly inventory: InventoryService,
        private readonly utilities: UtilitiesService,
        private readonly toast: ToastService
    ) {}

    public loading: boolean = false;

    public stock: any[] = [];
    public rawStock: any[] = [];

    public quantity_types: any[];

    ngOnInit(): void {
        this.load();
    }

    load() {
        this.loading = true;
        forkJoin({
            inventories: this.inventory.getAllStocks(),
            quantity_types: this.utilities.getAllQuantities(),
        })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r) {
                    this.quantity_types = r.quantity_types;

                    this.prepareStock(r.inventories);
                } else {
                    this.loading = false;
                }
            });
    }

    prepareStock(stockArr) {
        let newStockArr: any[] = [];

        stockArr.forEach((x) => {
            let quantity_type = this.quantity_types.find((quan) => {
                return x.quantity_type === quan.id;
            }).abbreviation;

            newStockArr.push({
                ...x,
                quantity_type: quantity_type,
            });
        });

        this.stock = newStockArr;
        this.rawStock = stockArr;
        this.loading = false;
    }

    syncStock() {
        let changedStocks: any[] = [];

        for (let i = 0; i < this.stock.length; i++) {
            if (this.stock[i].count !== this.rawStock[i].count) {
                changedStocks.push({
                    id: this.stock[i].id,
                    count: this.stock[i].count.toString(),
                });
            }
        }

        this.inventory
            .updateStocks(changedStocks)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: ResponseModel) => {
                if (r.status === 201) {
                    this.toast.successToast.next({
                        severity: 'success',
                        detail: r.message,
                    });

                    console.log(r);
                    this.load();
                }
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
