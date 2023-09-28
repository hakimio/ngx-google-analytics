import {Routes} from '@angular/router';
import {TestPageAComponent} from './test-page-a/test-page-a.component';
import {TestPageBComponent} from './test-page-b/test-page-b.component';

export const ROUTES: Routes = [
    {
        path: 'page-1',
        component: TestPageAComponent
    },
    {
        path: 'page-2',
        component: TestPageBComponent
    }
];
