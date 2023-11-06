import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from 'primeng/menu';

import { SidebarComponent } from './sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MenuModule, SharedModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
