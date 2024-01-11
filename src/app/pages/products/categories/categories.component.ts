import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { UtilitiesService } from 'src/app/services/utilities.service';
import { CategoryDetailsComponent } from 'src/app/shared/dialog/category-details/category-details.component';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    providers: [DialogService],
})
export class CategoriesComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly utilities: UtilitiesService,
        private readonly dialogService: DialogService
    ) {}

    public loading: boolean = false;
    public categories: TreeNode[];
    public ref: DynamicDialogRef;

    ngOnInit(): void {
        this.loading = true;
        this.loadCategories();
        this.openNewCategoryDialog();
    }

    loadCategories() {
        this.utilities
            .getAllCategories()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                this.mapCategoryTree(r);
            });
    }

    mapCategoryTree(categoryObj) {
        let newCat: any[] = [];
        categoryObj.forEach((cat) => {
            let subCategoryObj: any[] = [];

            cat.SUB_CATEGORIES.forEach((sub) => {
                subCategoryObj.push({
                    data: {
                        name: sub.name,
                        description: sub.description,
                    },
                });
            });

            newCat.push({
                data: {
                    name: cat.name,
                    description: cat.description,
                },
                children: subCategoryObj,
            });
        });

        this.categories = newCat;
        this.loading = false;
    }

    openNewCategoryDialog() {
        this.ref = this.dialogService.open(CategoryDetailsComponent, {
            header: 'Create a new Category',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadCategories();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
