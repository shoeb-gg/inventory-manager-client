import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { ResponseModel } from 'src/app/common/models/Response_Model';

import { InventoryService } from 'src/app/services/inventory.service';
import { ProductsService } from 'src/app/services/products.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import { PurchaseDetailsComponent } from 'src/app/shared/dialog/purchase-details/purchase-details.component';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
    providers: [DialogService],
})
export class InventoryComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly inventory: InventoryService,
        private readonly utilities: UtilitiesService,
        private readonly purchases: PurchasesService,
        private readonly dialogService: DialogService,
        private readonly product: ProductsService,
        private readonly toast: ToastService
    ) {}

    public ref: DynamicDialogRef;

    public loading: boolean = false;

    public stock: any[] = [];
    public rawStock: any[] = [];

    public quantity_types: any[];

    public products: any[];
    public sellers: any[];

    ngOnInit(): void {
        this.load();
    }

    load() {
        this.loading = true;
        forkJoin({
            inventories: this.inventory.getAllStocks(),
            quantity_types: this.utilities.getAllQuantities(),
            products: this.product.getAllproducts(),
            sellers: this.purchases.getAllSellers(),
        })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r) {
                    this.quantity_types = r.quantity_types;

                    this.prepareStock(r.inventories);
                    this.products = r.products;
                    this.sellers = r.sellers;
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

                    this.load();
                }
            });
    }

    makePurchase(product) {
        this.ref = this.dialogService.open(PurchaseDetailsComponent, {
            header: `Purchase ${product.name}`,
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
                product: product,
                products: this.products,
                sellers: this.sellers,
            },
        });
        this.ref.onClose
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                if (r) {
                    this.loading = true;
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
