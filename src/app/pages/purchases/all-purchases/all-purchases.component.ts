import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import { PurchasesService } from 'src/app/services/purchases.service';
import { ProductsService } from 'src/app/services/products.service';

import { PurchaseDetailsComponent } from 'src/app/shared/dialog/purchase-details/purchase-details.component';

@Component({
    selector: 'app-all-purchases',
    templateUrl: './all-purchases.component.html',
    styleUrls: ['./all-purchases.component.scss'],
    providers: [DialogService],
})
export class AllPurchasesComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly purchases: PurchasesService,
        private readonly dialogService: DialogService,
        private readonly product: ProductsService
    ) {}

    @ViewChild('calendar') private calendar: any;

    public allPurchases: any[] = [];
    public originalAllPurchases: any[] = [];
    public ref: DynamicDialogRef;
    public loading: boolean = false;

    public selectedDate;

    public products: any[];
    public sellers: any[];

    public options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    ngOnInit(): void {
        this.loading = true;
        this.loadPurchases();
    }

    loadPurchases() {
        this.purchases
            .getAllPurchases()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r) {
                    this.loadProductsAndSellers(r);
                } else {
                    this.loading = false;
                }
            });
    }

    loadProductsAndSellers(purchaseArr) {
        forkJoin({
            products: this.product.getAllproducts(),
            sellers: this.purchases.getAllSellers(),
        })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r) {
                    this.products = r.products;
                    this.sellers = r.sellers;

                    this.preparePurchase(purchaseArr);
                } else {
                    this.loading = false;
                }
            });
    }

    preparePurchase(purchaseArr) {
        let newPurchaseArr: any[] = [];

        purchaseArr.forEach((x) => {
            let product = this.products.find((prod) => {
                return x.product === prod.id;
            });

            let seller = this.sellers.find((sel) => {
                return x.seller === sel.id;
            });

            let date = new Date(x.created_at);

            newPurchaseArr.push({
                ...x,
                product: product,
                seller: seller,
                date: date.toLocaleDateString('en-GB', this.options),
            });
        });

        this.allPurchases = newPurchaseArr;
        this.originalAllPurchases = newPurchaseArr;

        this.loading = false;
    }

    openNewPurchasesDialog() {
        this.ref = this.dialogService.open(PurchaseDetailsComponent, {
            header: 'Make a Purchase',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
                products: this.products,
                sellers: this.sellers,
            },
        });

        this.ref.onClose
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                if (r) {
                    this.loading = true;
                    this.loadPurchases();
                }
            });
    }

    openEditPurchaseDialog(purchase) {
        this.ref = this.dialogService.open(PurchaseDetailsComponent, {
            header: `Edit Purchase of ${purchase.product.name}`,
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
                purchase: purchase,
                products: this.products,
                sellers: this.sellers,
            },
        });
        this.ref.onClose
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                if (r) this.loadPurchases();
            });
    }

    selectDateRange() {
        if (this.selectedDate[1]) {
            this.loading = true;

            this.calendar.overlayVisible = false;

            this.filterByDateRange(
                new Date(this.selectedDate[0]),
                new Date(this.selectedDate[1])
            );
        }
    }

    filterByDateRange(startDate, endDate) {
        let newPurchaseArr = this.allPurchases.filter((obj) => {
            const objDate = new Date(obj.created_at);
            return objDate >= startDate && objDate <= endDate;
        });

        this.allPurchases = newPurchaseArr;

        this.loading = false;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
