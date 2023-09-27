import {IGoogleAnalyticsOptions, IGoogleAnalyticsSettings} from './interfaces/i-google-analytics-settings';
import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN} from './tokens/ngx-google-analytics-settings-token';
import {NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER} from './initializers/google-analytics.initializer';

export function provideGoogleAnalytics(
    ga4TagId: string,
    options?: IGoogleAnalyticsOptions
): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
            useValue: {
                ga4TagId,
                ...options
            } as IGoogleAnalyticsSettings
        },
        NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER
    ]);
}
