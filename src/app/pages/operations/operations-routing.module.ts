import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperationsComponent } from './operations.component';
import { AllOperationsComponent } from './all-operations/all-operations.component';
import { OperatorsComponent } from './operators/operators.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app/operations/all',
        pathMatch: 'full',
    },
    {
        path: '',
        component: OperationsComponent,
        children: [
            {
                path: 'all',
                component: AllOperationsComponent,
            },
            {
                path: 'operators',
                component: OperatorsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperationsRoutingModule {}
