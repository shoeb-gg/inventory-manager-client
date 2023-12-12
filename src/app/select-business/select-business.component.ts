import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-select-business',
    templateUrl: './select-business.component.html',
    styleUrls: ['./select-business.component.scss'],
})
export class SelectBusinessComponent implements OnInit {
    public cities;
    public selectedCity;

    constructor(private readonly router: Router) {}

    ngOnInit() {
        this.cities = [
            { name: 'New York', dummy: 'yes' },
            { name: 'Rome', dummy: 'no' },
        ];
    }

    goToBusiness(event: any) {
        console.log(event);

        this.router.navigateByUrl('app');
    }
}
