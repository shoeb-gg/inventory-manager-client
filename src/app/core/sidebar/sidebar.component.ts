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
                                label: 'Sellers',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/app/purchases/sellers'],
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
