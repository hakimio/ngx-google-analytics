import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'ga-app-test-page-b',
    templateUrl: './test-page-b.component.html',
    styleUrls: ['./test-page-b.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class TestPageBComponent {}
