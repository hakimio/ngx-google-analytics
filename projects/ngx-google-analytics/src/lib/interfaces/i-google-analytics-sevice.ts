import {Primitive} from '../types/primitive.type';

export interface IGoogleAnalyticsServiceEvent {
    category?: string;
    label?: string;
    // A value to measure something
    value?: number;
    // If user interaction is performed
    interaction?: boolean;
    // Custom dimensions
    options?: Record<string, Primitive>;
}

export interface IGoogleAnalyticsServicePageView {
    title?: string;
    location?: string;
    // Custom dimensions
    options?: Record<string, Primitive>;
}

export interface IGoogleAnalyticsServiceAppView {
    appId?: string;
    appVersion?: string;
    installerId?: string;
}
