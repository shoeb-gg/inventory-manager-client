import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectBusinessRoutingModule } from './select-business-routing.module';
import { SelectBusinessComponent } from './select-business.component';

import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [SelectBusinessComponent],
    imports: [
        CommonModule,
        FormsModule,
        SelectBusinessRoutingModule,
        ListboxModule,
        ButtonModule,
    ],
})
export class SelectBusinessModule {}
