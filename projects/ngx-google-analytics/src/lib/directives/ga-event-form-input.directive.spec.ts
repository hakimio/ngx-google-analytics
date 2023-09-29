import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxGoogleAnalyticsModule} from '../ngx-google-analytics.module';
import {GoogleAnalyticsService} from '../services/google-analytics.service';
import {GaEventFormInputDirective} from './ga-event-form-input.directive';
import {GaEventDirective} from './ga-event.directive';
import {By} from '@angular/platform-browser';

describe('GaEventFormInputDirective', () => {

    @Component({
        selector: 'ga-host',
        template: `<input gaEvent="test">`,
        standalone: true,
        changeDetection: ChangeDetectionStrategy.OnPush,
        imports: [
            NgxGoogleAnalyticsModule
        ]
    })
    class HostComponent {}

    let gaEventFormInput: GaEventFormInputDirective,
        gaEvent: GaEventDirective,
        fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HostComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        const debugEl = fixture.debugElement,
            inputElInjector = debugEl.query(By.css('input')).injector;

        gaEventFormInput = inputElInjector.get(GaEventFormInputDirective);
        gaEvent = inputElInjector.get(GaEventDirective);
    });

    it('should create an instance', () => {
        expect(gaEventFormInput).toBeTruthy();
    });

    it('should update gaBind when input is updated', () => {
        gaEventFormInput.gaBind = 'click';
        expect(gaEvent.gaBind).toBe('click');
    });

    it('should use `focus` as a default gaBind', () => {
        expect(gaEvent.gaBind).toBe('focus');
    });

    it('should call `GoogleAnalyticsService.event()` on trigger focus at input', () => {
        const ga = TestBed.inject(GoogleAnalyticsService),
            spyOnGa = jest.spyOn(ga, 'event'),
            input = fixture.debugElement.query(e => e.name === 'input');

        fixture.detectChanges();
        input.nativeElement.dispatchEvent(new FocusEvent('focus'));
        fixture.detectChanges();

        expect(spyOnGa).toHaveBeenCalledWith('test', expect.any(Object));
    });
});
