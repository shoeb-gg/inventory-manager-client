import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { AllOperationsComponent } from './all-operations/all-operations.component';
import { OperatorsComponent } from './operators/operators.component';

import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    declarations: [
        OperationsComponent,
        AllOperationsComponent,
        OperatorsComponent,
    ],
    imports: [
        CommonModule,
        OperationsRoutingModule,
        ButtonModule,
        TabViewModule,
    ],
})
export class OperationsModule {}
