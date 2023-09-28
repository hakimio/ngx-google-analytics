import {EnvironmentProviders, Provider, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {ROUTES} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideGoogleAnalytics, provideGoogleAnalyticsRouter} from 'ngx-google-analytics';
import {environment} from '../environments/environment';
import {REMOVE_STYLES_ON_COMPONENT_DESTROY} from '@angular/platform-browser';

export const APP_PROVIDERS: (Provider | EnvironmentProviders)[] = [
    {
        provide: REMOVE_STYLES_ON_COMPONENT_DESTROY,
        useValue: true
    },
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(ROUTES),
    provideAnimations(),
    provideGoogleAnalytics(environment.ga),
    provideGoogleAnalyticsRouter({include: ['/page-*']})
];
