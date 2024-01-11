import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ToastService } from 'src/app/services/toast.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import { ResponseModel } from 'src/app/common/models/Response_Model';

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly toast: ToastService,
        public config: DynamicDialogConfig,
        private readonly ref: DynamicDialogRef,
        private readonly utilities: UtilitiesService
    ) {}

    categoryForm: FormGroup;
    public subCategoryArray?: FormArray;

    ngOnInit(): void {
        this.categoryForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            SUB_CATEGORIES: this.formBuilder.array([]),
        });

        this.subCategoryArray = this.categoryForm.get(
            'SUB_CATEGORIES'
        ) as FormArray;

        this.increaseSubCategoryField();
    }

    createCategory() {
        if (this.categoryForm.invalid) {
            this.toast.errorToast.next({
                severity: 'error',
                detail: 'Please fill out the required fields !',
            });
            return;
        }

        this.utilities
            .createCategory(this.categoryForm.value)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: ResponseModel) => {
                if (r.status === 201) {
                    this.toast.successToast.next({
                        severity: 'success',
                        detail: r.message,
                    });
                }
                // this.ref.close(1);
            });
    }

    increaseSubCategoryField() {
        const f = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
        (this.categoryForm.get('SUB_CATEGORIES') as FormArray).push(f);
    }

    decreaseSubCategoryField() {
        this.subCategoryArray?.removeAt(this.subCategoryArray.length - 1);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
