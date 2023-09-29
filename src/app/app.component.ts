import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgxGoogleAnalyticsModule} from '@hakimio/ngx-google-analytics';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
    selector: 'ga-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterLink, RouterOutlet, NgxGoogleAnalyticsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'ngx-google-analytics';
}
