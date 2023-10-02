import {GtagFnArgs} from '../types/gtag.type';

/**
 * Standardizes a common command protocol :)
 */
export interface IGoogleAnalyticsCommand {
    command: string;
    values: GtagFnArgs;
}
