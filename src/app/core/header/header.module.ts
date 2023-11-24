import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { MenuModule } from 'primeng/menu';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, RouterModule, MenuModule, InputSwitchModule],
    exports: [HeaderComponent],
})
export class HeaderModule {}
