import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppMenuitemComponent } from './app.menuitem.component';
import { ProductDetailsComponent } from './dialog/product-details/product-details.component';

@NgModule({
    declarations: [AppMenuitemComponent, ProductDetailsComponent],
    imports: [CommonModule, RouterModule],
    exports: [AppMenuitemComponent, ProductDetailsComponent],
})
export class SharedModule {}
