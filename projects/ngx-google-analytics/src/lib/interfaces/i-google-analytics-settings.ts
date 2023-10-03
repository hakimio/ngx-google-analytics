import {IGoogleAnalyticsCommand} from './i-google-analytics-command';

/**
 * Standardize a key-value object to configure GA installation.
 */
export interface IGoogleAnalyticsSettings {
    /** GA4 Tag Id ("G-XXXXXX") */
    ga4TagId: string;
    /**
     * You can inject custom initialization commands like UserId or other e-commerce features.
     * If set, it will run any GA Commands in sequence after setting up GA environment.
     */
    initCommands?: Array<IGoogleAnalyticsCommand>;
    /**
     * Instead of the default "https://www.googletagmanager.com/gtag/js" script, you can also use tag manager script:
     * "https://www.googletagmanager.com/gtm.js". If you use "gtm.js", remember to also use tag manager ID:
     * "GTM-XXXXXX" instead of gtag id "G-XXXXXX".
     */
    uri?: string;
    /** If true, trace GA tracking errors in production mode */
    enableTracing?: boolean;
    /** If set, nonce will be added to script tag **/
    nonce?: string;
}

export type IGoogleAnalyticsOptions = Exclude<IGoogleAnalyticsSettings, 'ga4TagId'>;
