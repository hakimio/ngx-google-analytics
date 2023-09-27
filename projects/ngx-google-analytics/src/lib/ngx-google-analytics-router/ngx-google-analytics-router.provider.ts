import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN} from '../tokens/ngx-google-analytics-router-settings-token';
import {IGoogleAnalyticsRoutingSettings} from '../interfaces/i-google-analytics-routing-settings';
import {NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER} from '../initializers/google-analytics-router.initializer';

export function provideGoogleAnalyticsRouter(settings?: IGoogleAnalyticsRoutingSettings): EnvironmentProviders {
    return makeEnvironmentProviders([
        NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER,
        {
            provide: NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN,
            useValue: settings ?? {}
        }
    ]);
}
