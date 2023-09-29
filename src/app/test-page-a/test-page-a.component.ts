import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'ga-app-test-page-a',
    templateUrl: './test-page-a.component.html',
    styleUrls: ['./test-page-a.component.css'],
    standalone: true,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPageAComponent {}
