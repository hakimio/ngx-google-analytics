import {ComponentRef, Injector} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {GoogleAnalyticsService} from '../services/google-analytics.service';
import {GoogleAnalyticsRouterInitializer} from './google-analytics-router.initializer';

describe('googleAnalyticsRouterInitializer(settings, gaService)', () => {

    function fakeTransform<Dest>(obj: Partial<Dest>): Dest {
        return obj as any;
    }

    let gaService: GoogleAnalyticsService,
        spyOnGaService: jest.SpyInstance,
        router$: Subject<any>,
        router: Router,
        component: ComponentRef<any>;

    beforeEach(() => {
        gaService = TestBed.inject(GoogleAnalyticsService);
        spyOnGaService = jest.spyOn(gaService, 'pageView');
        router$ = new Subject<any>();
        router = fakeTransform<Router>({
            events: router$
        });
        component = fakeTransform<ComponentRef<any>>({
            injector: fakeTransform<Injector>({
                get: () => router
            }),
            onDestroy: () => {}
        });
    });

    it('should not trigger multiple duplicated page views', async () => {
        await GoogleAnalyticsRouterInitializer(null, gaService)(component);

        // act
        router$.next(new NavigationStart(1, '/test'));
        router$.next(new NavigationEnd(1, '/test', '/test'));
        router$.next(new NavigationEnd(1, '/test', '/test'));

        // asserts
        expect(spyOnGaService).toHaveBeenCalledTimes(1);
        expect(spyOnGaService).toHaveBeenCalledWith('/test', undefined);
    });

    it('should trigger only included route', async () => {
        await GoogleAnalyticsRouterInitializer({include: ['/test']}, gaService)(component);

        // act
        router$.next(new NavigationStart(1, '/test'));
        router$.next(new NavigationEnd(1, '/test', '/test'));
        router$.next(new NavigationEnd(1, '/test', '/test'));
        router$.next(new NavigationStart(1, '/test1'));
        router$.next(new NavigationEnd(1, '/test1', '/test1'));
        router$.next(new NavigationStart(1, '/test2'));
        router$.next(new NavigationEnd(1, '/test2', '/test2'));

        // asserts
        expect(spyOnGaService).toHaveBeenCalledTimes(1);
        expect(spyOnGaService).toHaveBeenCalledWith('/test', undefined);
    });

    it('should not trigger excluded route', async () => {
        await GoogleAnalyticsRouterInitializer({exclude: ['/test']}, gaService)(component);

        // act
        router$.next(new NavigationStart(1, '/test1'));
        router$.next(new NavigationEnd(1, '/test1', '/test1'));
        router$.next(new NavigationStart(1, '/test2'));
        router$.next(new NavigationEnd(1, '/test2', '/test2'));
        router$.next(new NavigationStart(1, '/test'));
        router$.next(new NavigationEnd(1, '/test', '/test'));
        router$.next(new NavigationEnd(1, '/test', '/test'));

        // asserts
        expect(spyOnGaService).toHaveBeenCalledTimes(1);
        expect(spyOnGaService).toHaveBeenCalledWith('/test2', undefined);
    });

    it('should work w/ include and exclude router', async () => {
        await GoogleAnalyticsRouterInitializer({
                include: ['/test*'],
                exclude: ['/test-2']
            },
            gaService
        )(component);

        // act
        router$.next(new NavigationStart(1, '/test-1'));
        router$.next(new NavigationEnd(1, '/test-1', '/test-1'));
        router$.next(new NavigationEnd(1, '/test-1', '/test-1'));
        router$.next(new NavigationStart(1, '/test-2'));
        router$.next(new NavigationEnd(1, '/test-2', '/test-2'));

        // asserts
        expect(spyOnGaService).toHaveBeenCalledTimes(1);
        expect(spyOnGaService).toHaveBeenCalledWith('/test-1', undefined);
    });

    test.each([
        {
            path: '/test-1',
            matchType: 'simple uri'
        },
        {
            path: '/test*',
            matchType: 'wildcard uri'
        },
        {
            path: '/test.*',
            matchType: 'regex uri'
        }
    ])('should match $matchType', async ({path}) => {
        await GoogleAnalyticsRouterInitializer({
                include: [path]
            },
            gaService
        )(component);

        // act
        router$.next(new NavigationStart(1, '/test-1'));
        router$.next(new NavigationEnd(1, '/test-1', '/test-1'));
        router$.next(new NavigationEnd(1, '/test-1', '/test-1'));

        // asserts
        expect(spyOnGaService).toHaveBeenCalledTimes(1);
        expect(spyOnGaService).toHaveBeenCalledWith('/test-1', undefined);
    });

});
