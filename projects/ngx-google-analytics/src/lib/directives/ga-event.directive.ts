import {Directive, ElementRef, inject, Input, isDevMode, OnDestroy} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {GaActionEnum} from '../enums/ga-action.enum';
import {GoogleAnalyticsService} from '../services/google-analytics.service';
import {NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN} from '../tokens/ngx-google-analytics-settings-token';
import {GaEventCategoryDirective} from './ga-event-category.directive';

@Directive({
    selector: `[gaEvent]`,
    exportAs: 'gaEvent',
    standalone: true
})
export class GaEventDirective implements OnDestroy {

    @Input() gaAction!: GaActionEnum | string;
    @Input() gaLabel!: string;
    @Input() label!: string;
    @Input() gaValue!: number;
    @Input() gaInteraction!: boolean;
    @Input() gaEvent!: GaActionEnum | string;
    private bindSubscription?: Subscription;

    private readonly gaCategoryDirective = inject(GaEventCategoryDirective, {optional: true});
    private readonly gaService = inject(GoogleAnalyticsService);
    private readonly settings = inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN);
    private readonly el = inject(ElementRef);

    constructor() {
        this.gaBind = 'click';
    }

    private _gaBind!: string;

    @Input()
    set gaBind(gaBind: string) {
        if (this.bindSubscription) {
            this.bindSubscription.unsubscribe();
        }

        this._gaBind = gaBind;
        this.bindSubscription = fromEvent(this.el.nativeElement, gaBind).subscribe(() => this.trigger());
    }
    get gaBind(): string {
        return this._gaBind;
    }

    ngOnDestroy() {
        if (this.bindSubscription) {
            this.bindSubscription.unsubscribe();
        }
    }

    protected trigger() {
        try {
            if (!this.gaAction && !this.gaEvent) {
                throw new Error('You must provide a gaAction attribute to identify this event.');
            }

            this.gaService
                .event(
                    this.gaAction || this.gaEvent,
                    {
                        category: this.gaCategoryDirective?.gaCategory,
                        label: this.gaLabel || this.label,
                        value: this.gaValue,
                        interaction: this.gaInteraction
                    }
                );
        } catch (err: any) {
            this.throw(err);
        }
    }

    protected throw(err: Error) {
        if ((isDevMode() || this.settings.enableTracing) && console && console.warn) {
            console.warn(err);
        }
    }

}
