import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { AllOperationsComponent } from './all-operations/all-operations.component';
import { OperatorsComponent } from './operators/operators.component';

import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

import { OperationCategoriesComponent } from './operation-categories/operation-categories.component';

@NgModule({
    declarations: [
        OperationsComponent,
        AllOperationsComponent,
        OperatorsComponent,
        OperationCategoriesComponent,
    ],
    imports: [
        CommonModule,
        OperationsRoutingModule,
        ButtonModule,
        TabViewModule,
        TableModule,
    ],
})
export class OperationsModule {}
