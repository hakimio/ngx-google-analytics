# CHANGELOG

* [15.0.0](#1500)
* [14.0.0](#1400)
* [13.0.1](#1301)
* [13.0.0](#1300)
* [12.0.0](#1200)
* [11.2.1](#1121)
* [11.2.0](#1120)
* [11.1.0](#1110)
* [11.0.0](#1100)
* [10.0.0](#1000)
* [9.2.0](#920)
* [9.1.1](#911)
* [9.1.0](#910)
* [9.0.1](#901)
* [9.0.0](#900)
* [8.1.0](#810)

## 15.0.0

- `GA4` support
- Updated Angular to `v16` and dropped support for older versions
- Dropped `rxjs` `v6` support. Now only `rxjs` `v7` is supported. 
- `NgxGoogleAnalyticsModule.forRoot()` and `NgxGoogleAnalyticsRouterModule.forRoot()` are 
now replaced by `provideGoogleAnalytics()` and `provideGoogleAnalyticsRouter()` to set up library's providers
- All directives are now standalone and can be imported separately or used as `hostDirectives` in other directives
- `GoogleAnalyticsService` methods now use options objects to specify additional arguments instead of a long list
of arguments with some of the arguments `undefined`.

Thanks, @Spejik, for the implementation. 

Before:
```ts
this.gaService.pageView('/test', 'Test the Title', undefined, {
  user_id: 'my-user-id'
});
```
After:
```ts
this.gaService.pageView('/test', {
    title: 'Test the Title',
    options: {
        user_id: 'my-user-id'
    }
});
```

## 14.0.0

* Added additional optional parameters
* Update to support angular 14 (#96)

## 13.0.1

* Bump Karma
* Bump Jasmine
* Bump RXJS to 7.4.0
* Migrate from TSLint to ESLint

## 13.0.0

* Bump to ng v13

## 12.0.0

* Bump to ng v12

## 11.2.1

* Allow override initial commands

## 11.2.0

* Fixed parameter initCommands on NgxGoogleAnalyticsModule.forRoot() #46
* Allow directive gaBind to trigger on any kind of event. #43

## 11.1.0

* Using enum instead of string type (#38)

## 11.0.0

* Bump to ng v11

## 10.0.0

* Bump to ng v10

## 9.2.0

* Add include/exclude rules feature on NgxGoogleAnalyticsRouterModule.forRoot() to filter witch pages should trigger page-view event.
* Remove `peerDependencies` from package.json to do not trigger unnecessary warnings on `npm install` command.

## 9.1.1

* [Bugfix] Set nonce using `setAttribute`

## 9.1.0

* Add nonce
* Fix typos
* Rename i-google-analytics-command.ts

## 9.0.1

* Created set() method at GoogleAnalyticsService (https://developers.google.com/analytics/devguides/collection/gtagjs/setting-values);
* Changed gtag() method signature at GoogleAnalyticsService to accept anything;
* Added a filter to remove undefined values to rest parameter on gtag() fn;

## 9.0.0

Just bump to Angular ^9.x

## 8.1.0

* Created and Updated unit tests on library project;
* Created an automated workflow to run unit tests on each PR;
* Created TypeDocs on all Services, Modules and Directives to help you guys to use this lib;
* Removed bad practices on access Window and Document objects directly by Angular Services. I decided to create Injection Tokens to resolve those Browser Objects.;
* Added some validations to ensure it is a Browser Environment;
* Added cleanup code on NgxGoogleAnalyticsRouterModule. In short, we now unsubscribe Router events when bootstrap app is destroyed;
* Added a new Settings property `ennableTracing` to log on console Errors and Warnings about `gtag()` calls;
* Now we have `InjectionToken` for everything. You can replace all our default settings;
