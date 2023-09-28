import {inject, InjectionToken} from '@angular/core';
import {DataLayer} from '../types/data-layer.type';
import {GtagFn} from '../types/gtag.type';
import {NGX_DATA_LAYER} from './ngx-data-layer-token';
import {GaWindow} from './ngx-google-analytics-window';
import {NGX_WINDOW} from './ngx-window-token';

/**
 * Check if there is some global function called gtag on Window object, or create an empty function that doesn't break code...
 */
export function getGtagFn(window: GaWindow, dataLayer: DataLayer): GtagFn | null {
    return (window)
        ? window['gtag'] = window['gtag'] || function (...args) {
            dataLayer.push(args);
        }
        : null;
}

/**
 * Provides an injection token to access Google Analytics Gtag Function
 */
export const NGX_GTAG_FN = new InjectionToken<GtagFn>('ngx-gtag-fn', {
    providedIn: 'root',
    factory: () => getGtagFn(inject(NGX_WINDOW), inject(NGX_DATA_LAYER))
});
