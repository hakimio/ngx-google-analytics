import {NgModule} from '@angular/core';
import {GaEventCategoryDirective} from './directives/ga-event-category.directive';
import {GaEventFormInputDirective} from './directives/ga-event-form-input.directive';
import {GaEventDirective} from './directives/ga-event.directive';

const COMPONENTS = [GaEventDirective, GaEventCategoryDirective, GaEventFormInputDirective];

@NgModule({
    imports: COMPONENTS,
    exports: COMPONENTS
})
export class NgxGoogleAnalyticsModule {}
