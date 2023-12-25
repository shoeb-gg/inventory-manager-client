import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { LayoutService } from './services/layout.service';
import { AuthService } from './core/auth/auth.service';

import { ToastService } from './services/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService],
})
export class AppComponent implements OnInit {
    constructor(
        public layoutService: LayoutService,
        private readonly messageService: MessageService,
        private readonly toast: ToastService
    ) {}

    async ngOnInit() {
        const theme = await JSON.parse(
            localStorage.getItem('theme') ||
                JSON.stringify({
                    theme: 'light',
                    colorScheme: 'lara-light-blue',
                })
        );

        await this.layoutService.changeTheme(theme.theme, theme.colorScheme);

        this.initToast();
    }

    initToast() {
        this.toast.successToast.subscribe((r) => {
            if (r) {
                this.messageService.add({
                    severity: r.severity,
                    summary: 'Success',
                    detail: r.detail,
                });
            }
        });

        this.toast.errorToast.subscribe((r) => {
            if (r) {
                this.messageService.add({
                    severity: r.severity,
                    summary: 'Error',
                    detail: r.detail,
                });
            }
        });
    }
}
