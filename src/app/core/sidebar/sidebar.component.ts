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
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/app/dashboard'],
                    },
                    {
                        label: 'Products',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'All Products',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/products/all'],
                            },
                            {
                                label: 'Product Categories',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/products/categories'],
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
                                routerLink: [''],
                            },
                            {
                                label: 'Quantity Types',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/app/utilities/quantity-types'],
                            },
                        ],
                    },
                    // {
                    //     label: 'Orders',
                    //     icon: 'pi pi-fw pi-globe',
                    //     routerLink: ['/app/orders'],
                    // },

                    // {
                    //     label: 'Stock',
                    //     icon: 'pi pi-fw pi-globe',
                    //     routerLink: ['/app/stock'],
                    // },

                    // {
                    //     label: 'Supplier',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: [
                    //         {
                    //             label: 'All Suppliers',
                    //             icon: 'pi pi-fw pi-sign-in',
                    //             routerLink: ['/auth/login'],
                    //         },
                    //         {
                    //             label: 'New Supplier',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/auth/error'],
                    //         },
                    //         {
                    //             label: 'Supplier Categories',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/auth/access'],
                    //         },
                    //     ],
                    // },
                    // {
                    //     label: 'Purchase',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: [
                    //         {
                    //             label: 'All Purchases',
                    //             icon: 'pi pi-fw pi-sign-in',
                    //             routerLink: ['/auth/login'],
                    //         },
                    //         {
                    //             label: 'New Purchase',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/auth/error'],
                    //         },
                    //     ],
                    // },
                    // {
                    //     label: 'Operations',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: [
                    //         {
                    //             label: 'All Operations',
                    //             icon: 'pi pi-fw pi-sign-in',
                    //             routerLink: ['/auth/login'],
                    //         },
                    //         {
                    //             label: 'New Operation',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/auth/error'],
                    //         },
                    //     ],
                    // },
                ],
            },
        ];
    }
}
