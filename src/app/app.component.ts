import {Component} from '@angular/core';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
    selector: 'ga-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterLink, RouterOutlet, NgxGoogleAnalyticsModule]
})
export class AppComponent {
    title = 'ngx-google-analytics-sdk';
}
