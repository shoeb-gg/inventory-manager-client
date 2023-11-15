import { Component } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
    public categories: TreeNode[] = [
        {
            data: {
                name: 'Category 1',
                description: 'some description',
            },
            children: [
                {
                    data: {
                        name: 'Sub-Category 1.1',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 1.2',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 1.3',
                        description: 'some description',
                    },
                },
            ],
        },
        {
            data: {
                name: 'Category 2',
                description: 'some description',
            },
            children: [
                {
                    data: {
                        name: 'Sub-Category 2.1',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 2.2',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 2.3',
                        description: 'some description',
                    },
                },
            ],
        },
        {
            data: {
                name: 'Category 3',
                description: 'some description',
            },
            children: [
                {
                    data: {
                        name: 'Sub-Category 3.1',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 3.2',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 3.3',
                        description: 'some description',
                    },
                },
            ],
        },
        {
            data: {
                name: 'Category 4',
                description: 'some description',
            },
            children: [
                {
                    data: {
                        name: 'Sub-Category 4.1',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 4.2',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 4.3',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 4.4',
                        description: 'some description',
                    },
                },
                {
                    data: {
                        name: 'Sub-Category 4.5',
                        description: 'some description',
                    },
                },
            ],
        },
    ];
}
