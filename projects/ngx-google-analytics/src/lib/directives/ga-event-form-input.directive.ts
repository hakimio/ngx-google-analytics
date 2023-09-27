import {Directive, inject, Input} from '@angular/core';
import {GaEventDirective} from './ga-event.directive';

@Directive({
    selector: `
        input[gaEvent],
        select[gaEvent],
        textarea[gaEvent]
    `,
    standalone: true
})
export class GaEventFormInputDirective {

    private readonly gaEvent = inject(GaEventDirective, {
        optional: true,
        host: true
    });

    constructor() {
        this.gaBind = 'focus';
    }

    @Input() set gaBind(bind: string) {
        if (this.gaEvent) {
            this.gaEvent.gaBind = bind;
        }
    }

}
