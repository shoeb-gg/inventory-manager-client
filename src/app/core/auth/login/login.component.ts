import { Component } from '@angular/core';

import { LayoutService } from 'src/app/services/layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    password!: string;

    constructor(public layoutService: LayoutService) {}
}
