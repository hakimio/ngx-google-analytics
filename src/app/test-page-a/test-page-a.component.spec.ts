import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestPageAComponent} from './test-page-a.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('TestPageAComponent', () => {
    let component: TestPageAComponent;
    let fixture: ComponentFixture<TestPageAComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule,
                    TestPageAComponent
                ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPageAComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
