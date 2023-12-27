import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { BusinessService } from '../services/business.service';

import { BusinessDetailsComponent } from '../shared/dialog/business-details/business-details.component';

@Component({
    selector: 'app-select-business',
    templateUrl: './select-business.component.html',
    styleUrls: ['./select-business.component.scss'],
    providers: [DialogService],
})
export class SelectBusinessComponent implements OnInit {
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

        this.ref.onClose.subscribe(() => {
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

        this.ref.onClose.subscribe(() => {
            this.loadBusinesses();
        });
    }

    loadBusinesses() {
        this.business.getUserMultipleBusiness().subscribe((r) => {
            this.businesses = r;
        });
    }
}
