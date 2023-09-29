# Ngx Google Analytics

> A simple way to track GA4 events in Angular apps.

`@hakimio/ngx-google-analytics` is a fork of __Max Andriani's__ `ngx-google-analytics`.

# Index

- [Setup](#setup)
  - [Install the package](#install-the-package)
  - [Simple Setup](#simple-setup)
  - [Setup Router Provider](#setup-router-provider)
  - [Advanced Router Provider Setup](#advanced-router-provider-setup)
- [GoogleAnalyticsService](#googleanalyticsservice)
  - [Register Analytics events](#register-analytics-events)
  - [Manually register page views](#manually-register-page-views)
- [Directives](#directives)
  - [Simple directive usage](#simple-directive-usage)
  - [Usage on input elements](#usage-on-input-elements)
  - [Directive groups](#directive-groups)

## Setup

### Install the package

```
npm install @hakimio/ngx-google-analytics
```

### Simple Setup

- Add `NgxGoogleAnalyticsModule` in your root app module (`AppModule`) `imports`. 
- Add `provideGoogleAnalytics('ga4-tag-id')` in your root app providers. If you can not find your GA4 tag id, see [this](https://support.google.com/analytics/answer/9539598?sjid=1584949217252276099-EU) Google help page.

```ts
import {NgxGoogleAnalyticsModule, provideGoogleAnalytics} from '@hakimio/ngx-google-analytics';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxGoogleAnalyticsModule
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ],
    providers: [
        provideGoogleAnalytics('ga4-tag-id')
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

### Setup Router Provider

If you are using Angular Router and would like to track page views, you can include `provideGoogleAnalyticsRouter()` in your root app providers.

**IMPORTANT:** `provideGoogleAnalyticsRouter()` is not compatible with SSR and should not be included in server app providers.

```ts
import {NgxGoogleAnalyticsModule, provideGoogleAnalytics, provideGoogleAnalyticsRouter} from '@hakimio/ngx-google-analytics';

@NgModule({
    imports: [
        // ...
        NgxGoogleAnalyticsModule
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ],
    providers: [
        provideGoogleAnalytics('ga4-tag-id'),
        provideGoogleAnalyticsRouter()
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ]
})
export class AppModule {}
```

### Advanced Router Provider Setup

You can include or exclude some routes by passing options object to `provideGoogleAnalyticsRouter(options)`. 

Following path matches are supported:

- Simple path match: `{ include: [ '/full-uri-match' ] }`;
- Wildcard path match: `{ include: [ '*/public/*' ] }`;
- Regex path match: `{ include: [ /^\/public\/.*/ ] }`;

```ts
import {NgxGoogleAnalyticsModule, provideGoogleAnalytics, provideGoogleAnalyticsRouter} from '@hakimio/ngx-google-analytics';

@NgModule({
    imports: [
        // ...
        NgxGoogleAnalyticsModule
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ],
    providers: [
        provideGoogleAnalytics('ga4-tag-id'),
        provideGoogleAnalyticsRouter({
            include: ['/some-path'],
            exclude: ['*/another/path/*']
        })
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ]
})
export class AppModule {}
```


## GoogleAnalyticsService

The service provides strongly typed way to call `gtag()` command. Apart from type checking, it does not do 
any other validation or transformation of the parameters.

### Register Analytics events

```ts
@Component()
export class TestFormComponent {

    private readonly gaService = inject(GoogleAnalyticsService);

    onUserInputName() {
        this.gaService.event('enter_name', {
            category: 'user_register_form',
            label: 'Name',
            options: {
                customDimension: 'foo_bar'
            }
        });
    }

    onUserInputEmail() {
        this.gaService.event('enter_email', {
            category: 'user_register_form',
            label: 'Email'
        });
    }

    onSubmit() {
        this.gaService.event('submit', {
            category: 'user_register_form',
            label: 'Enviar' 
        });
    }

}
```

### Manually register page views

```ts
@Component()
export class TestPageComponent implements OnInit {

    private readonly gaService = inject(GoogleAnalyticsService);

    ngOnInit() {
        this.gaService.pageView('/test', {
            title: 'Test the Title'
        });
    }
    
    onUserLogin() {
        this.gaService.pageView('/test', {
            title: 'Test the Title',
            options: {
                user_id: 'my-user-id'
            }
        });
    }

}
```

## Directives

Directives provide a simple way to register Analytics events. Instead of manually using `GoogleAnalyticsService`, 
you can simply add `ga*` attributes to your html elements.

### Simple directive usage

By default, the directive calls `gtag()` on click events, but you can also specify other events by providing `gaBind` attribute.

```html
<div>
  <button gaEvent="click_test" gaCategory="ga_directive_test">Click Test</button>
  <button gaEvent="focus_test" gaCategory="ga_directive_test" gaBind="focus">Focus Test</button>
  <button gaEvent="blur_test" gaCategory="ga_directive_test" gaBind="blur">Blur Test</button>
  <button gaEvent="custom_test" gaCategory="ga_directive_test" gaBind="customEvent">Custom Event Test</button>
</div>
```

### Usage on `input` elements

When `gaEvent` directive is used on form elements, the default `trigger` is `focus` event.

```html
<div>
  <input gaEvent="fill_blur" gaCategory="ga_directive_input_test" placeholder="Auto Blur Test"/>
</div>
```

### Directive groups

The `gaCategory` directive can be specified on higher level of html element group to specify same category for all 
child elements.

```html
<div gaCategory="ga_test_category">
  <button gaEvent gaAction="click_test">Click Test</button>
  <button gaEvent gaAction="focus_test" gaBind="focus">Focus Test</button>
  <button gaEvent gaAction="blur_test" gaBind="blur">Blur Test</button>
</div>
```
