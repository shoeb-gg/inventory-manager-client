import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { BusinessService } from '../services/business.service';

import { BusinessDetailsComponent } from '../shared/dialog/business-details/business-details.component';

@Component({
    selector: 'app-select-business',
    templateUrl: './select-business.component.html',
    styleUrls: ['./select-business.component.scss'],
    providers: [DialogService],
})
export class SelectBusinessComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    public businesses;
    public selectedbusiness;

    public ref: DynamicDialogRef;

    constructor(
        private readonly router: Router,
        private readonly dialogService: DialogService,
        private readonly business: BusinessService
    ) {}

    ngOnInit() {
        this.loadBusinesses();
    }

    goToBusiness(business: any) {
        localStorage.setItem('selectedBusinessId', business.id);
        localStorage.setItem('selectedBusinessName', business.name);

        this.router.navigateByUrl('app');
    }

    openNewBusinessDialog() {
        this.ref = this.dialogService.open(BusinessDetailsComponent, {
            header: 'Register a new Business',
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadBusinesses();
        });
    }

    openUpdateBusinessDialog(business: any) {
        this.ref = this.dialogService.open(BusinessDetailsComponent, {
            header: `Update Business: ${business.name}`,
            width: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: business.id,
        });

        this.ref.onClose.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.loadBusinesses();
        });
    }

    loadBusinesses() {
        this.business
            .getUserMultipleBusiness()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                this.businesses = r;
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
