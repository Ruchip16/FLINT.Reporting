import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CountdownOverlayComponent } from './countdown-overlay.component';

describe('CountdownOverlayComponent', () => {
    
    let fixture: ComponentFixture<CountdownOverlayComponent>;

    let component: CountdownOverlayComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CountdownOverlayComponent],
            imports: [NoopAnimationsModule],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(CountdownOverlayComponent);

        component = fixture.componentInstance;
        componentDE = fixture.debugElement;
        componentNE = fixture.nativeElement;

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(component).toBeDefined();
    });
});
