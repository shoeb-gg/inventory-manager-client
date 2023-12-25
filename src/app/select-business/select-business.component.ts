import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { BusinessDetailsComponent } from '../shared/dialog/business-details/business-details.component';

@Component({
    selector: 'app-select-business',
    templateUrl: './select-business.component.html',
    styleUrls: ['./select-business.component.scss'],
    providers: [DialogService],
})
export class SelectBusinessComponent implements OnInit {
    public cities;
    public selectedCity;

    public ref: DynamicDialogRef;

    constructor(
        private readonly router: Router,
        private readonly dialogService: DialogService
    ) {}

    ngOnInit() {
        this.cities = [
            { name: 'New York', dummy: 'yes' },
            { name: 'Rome', dummy: 'no' },
        ];

        this.openNewBusinessDialog();
    }

    goToBusiness(businessId: any) {
        console.log(businessId);

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
    }
}
