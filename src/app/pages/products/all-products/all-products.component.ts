import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ProductDetailsComponent } from 'src/app/shared/dialog/product-details/product-details.component';
import { ProductsService } from 'src/app/services/products.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.scss'],
    providers: [DialogService],
})
export class AllProductsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly dialogService: DialogService,
        private readonly product: ProductsService,
        private readonly utilities: UtilitiesService
    ) {}

    public loading: boolean = false;
    public ref: DynamicDialogRef;

    public categories: any[];
    public quantity_types: any[];
    public price_units: any[];

    public products;

    ngOnInit(): void {
        this.loading = true;
        this.loadProducts();
    }

    loadProducts() {
        this.product
            .getAllproducts()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                if (r) {
                    this.loadUtilities(r);
                } else {
                    this.loading = false;
                }
            });
    }

    loadUtilities(productArr) {
        forkJoin({
            categories: this.utilities.getAllCategories(),
            quantity_types: this.utilities.getAllQuantities(),
            price_units: this.utilities.getAllPrices(),
        })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r) {
                    this.loadUtilities(r);

                    this.categories = r.categories;
                    this.quantity_types = r.quantity_types;
                    this.price_units = r.price_units;

                    this.prepareProduct(productArr);
                } else {
                    this.loading = false;
                }
            });
    }

    prepareProduct(productArr) {
        let newProductArr: any[] = [];

        productArr.forEach((x) => {
            let category = this.categories.find((cat) => {
                return x.category === cat.id;
            });

            let subcategory = category?.SUB_CATEGORIES.find((scat) => {
                return x.subcategory === scat.id;
            }).name;

            let quantity_type = this.quantity_types.find((quan) => {
                return x.quantity_type === quan.id;
            }).abbreviation;

            let price_unit = this.price_units.find((price) => {
                return x.price_unit === price.id;
            }).abbreviation;

            newProductArr.push({
                ...x,
                category: category ? category.name : '',
                subcategory: subcategory,
                quantity_type: quantity_type,
                price_unit: price_unit,
            });
        });

        this.loading = false;

        this.products = newProductArr;
    }

    openNewProductDialog() {
        this.ref = this.dialogService.open(ProductDetailsComponent, {
            header: 'Register a new Product',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });
    }

    openEditProductDialog(product) {
        this.ref = this.dialogService.open(ProductDetailsComponent, {
            header: product.name,
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: product,
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
