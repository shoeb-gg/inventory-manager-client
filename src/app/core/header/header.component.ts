import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { LayoutService } from 'src/app/services/layout.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    items!: MenuItem[];
    public darkMode: boolean;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private readonly auth: AuthService
    ) {}

    async ngOnInit() {
        const currentTheme = await JSON.parse(
            localStorage.getItem('theme') || ''
        );
        this.darkMode = currentTheme
            ? currentTheme.colorScheme === 'dark'
            : false;

        this.items = [
            {
                label: 'Dark Mode Toggle',
                icon: 'pi pi-moon',
                command: () => {
                    this.themeToggle();
                },
            },
            {
                label: 'Logout',
                icon: 'pi pi-power-off',
                command: () => {
                    this.logout();
                },
            },
        ];
    }

    themeToggle() {
        this.darkMode = !this.darkMode;

        if (this.darkMode) {
            this.layoutService.changeTheme('lara-dark-teal', 'dark');
        } else {
            this.layoutService.changeTheme('lara-light-blue', 'light');
        }
    }

    logout() {
        this.auth.logout();
    }
}
