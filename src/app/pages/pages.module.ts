import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

import { HeaderModule } from '../core/header/header.module';
import { SidebarModule } from '../core/sidebar/sidebar.module';

@NgModule({
    declarations: [PagesComponent],
    imports: [CommonModule, PagesRoutingModule, HeaderModule, SidebarModule],
})
export class PagesModule {}
