import {Primitive} from '../types/primitive.type';

/**
 * Standardizes a common command protocol :)
 */
export interface IGoogleAnalyticsCommand {
    command: string;
    values: Array<Primitive>;
}
