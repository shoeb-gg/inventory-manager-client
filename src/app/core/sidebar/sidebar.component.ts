import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/app/dashboard'],
                    },
                    {
                        label: 'Inventory',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/app/inventory'],
                    },
                    {
                        label: 'Products',
                        icon: 'pi pi-fw pi-shopping-cart',
                        items: [
                            {
                                label: 'All Products',
                                icon: 'pi pi-fw pi-table',
                                routerLink: ['/app/products/all'],
                            },
                            {
                                label: 'Product Categories',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/app/products/categories'],
                            },
                        ],
                    },
                    {
                        label: 'Puchases',
                        icon: 'pi pi-fw pi-shopping-bag',
                        items: [
                            {
                                label: 'All Puchases',
                                icon: 'pi pi-fw pi-table',
                                routerLink: ['/app/purchases/all'],
                            },
                            {
                                label: 'Suppliers',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/app/purchases/suppliers'],
                            },
                        ],
                    },
                    {
                        label: 'Operations',
                        icon: 'pi pi-fw pi-hourglass',
                        items: [
                            {
                                label: 'All Operations',
                                icon: 'pi pi-fw pi-th-large',
                                routerLink: ['/app/operations/all'],
                            },
                            {
                                label: 'Operators',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/app/operations/operators'],
                            },
                            {
                                label: 'Operation Categories',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/app/operations/categories'],
                            },
                        ],
                    },
                    {
                        label: 'Utilities',
                        icon: 'pi pi-fw pi-wrench',
                        items: [
                            {
                                label: 'Price Units',
                                icon: 'pi pi-fw pi-dollar',
                                routerLink: ['/app/utilities/price-units'],
                            },
                            {
                                label: 'Quantity Types',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/app/utilities/quantity-types'],
                            },
                        ],
                    },
                ],
            },
        ];
    }
}
