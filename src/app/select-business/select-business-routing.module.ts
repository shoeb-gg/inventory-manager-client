import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectBusinessComponent } from './select-business.component';

const routes: Routes = [
    {
        path: '',
        component: SelectBusinessComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SelectBusinessRoutingModule {}
