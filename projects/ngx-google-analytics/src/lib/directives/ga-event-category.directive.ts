import {Directive, Input} from '@angular/core';

@Directive({
    selector: `
        [gaEvent][gaCategory],
        [gaCategory]
    `,
    exportAs: 'gaCategory',
    standalone: true
})
export class GaEventCategoryDirective {

    @Input() gaCategory!: string;

}
