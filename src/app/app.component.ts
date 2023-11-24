import { Component, OnInit } from '@angular/core';

import { LayoutService } from './services/layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(public layoutService: LayoutService) {}

    async ngOnInit(): Promise<void> {
        const theme = await JSON.parse(localStorage.getItem('theme') || '');
        await this.layoutService.changeTheme(theme.theme, theme.colorScheme);
    }
}
