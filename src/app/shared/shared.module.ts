import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppMenuitemComponent } from './app.menuitem.component';

@NgModule({
  declarations: [AppMenuitemComponent],
  imports: [CommonModule, RouterModule],
  exports: [AppMenuitemComponent],
})
export class SharedModule {}
