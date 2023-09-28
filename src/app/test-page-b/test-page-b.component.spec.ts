import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestPageBComponent} from './test-page-b.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('TestPageBComponent', () => {
    let component: TestPageBComponent;
    let fixture: ComponentFixture<TestPageBComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule,
                    TestPageBComponent
                ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPageBComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
