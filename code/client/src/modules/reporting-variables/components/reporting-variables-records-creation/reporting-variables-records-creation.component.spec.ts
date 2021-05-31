import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReportingFrameworksDataService } from '@modules/reporting-frameworks/services';
import { ReportingVariablesDataService } from '@modules/reporting-variables/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { ReportingVariablesRecordsCreationComponent } from './reporting-variables-records-creation.component';

@Component({
    template: `
        <sb-reporting-variables-records-creation [someInput]="someInput" (someFunction)="someFunction($event)"></sb-reporting-variables-records-creation>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('ReportingVariablesRecordsCreationComponent', () => {

    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: ReportingVariablesRecordsCreationComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, ReportingVariablesRecordsCreationComponent],
            imports: [NoopAnimationsModule, HttpClientTestingModule, LoggerModule.forRoot({ serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.TRACE, serverLogLevel: NgxLoggerLevel.OFF })],
            providers:
                [
                    NgbActiveModal,
                    ReportingFrameworksDataService,
                    ReportingVariablesDataService
                ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-reporting-variables-records-creation')).toEqual(jasmine.anything());
    });
});
