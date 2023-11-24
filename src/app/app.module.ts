import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { SidebarModule } from 'primeng/sidebar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutService } from './services/layout.service';

async function initializeApp(layoutService: LayoutService) {}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        SidebarModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: () => initializeApp,
            deps: [LayoutService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
