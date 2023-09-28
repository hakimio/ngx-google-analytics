import {GtagFn} from '../types/gtag.type';
import {DataLayer} from '../types/data-layer.type';

export type GaWindow = Window & {
    gtag?: GtagFn;
    dataLayer?: DataLayer;
};
