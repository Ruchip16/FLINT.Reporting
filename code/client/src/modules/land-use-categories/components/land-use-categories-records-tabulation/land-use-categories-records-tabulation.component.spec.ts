import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoadingAnimationComponent, PaginationComponent } from '@common/components';
import { LandUseCategoriesRecordsTabulationService } from '@modules/land-use-categories/services';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { of } from 'rxjs/internal/observable/of';

import { LandUseCategoriesRecordsTabulationComponent } from './land-use-categories-records-tabulation.component';

describe('LandUseCategoriesRecordsTabulationComponent', () => {

    let fixture: ComponentFixture<LandUseCategoriesRecordsTabulationComponent>;

    let component: LandUseCategoriesRecordsTabulationComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    const fakeActivatedRoute = {
        snapshot: { data: {} }
      } as ActivatedRoute;

        

    

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PaginationComponent, LoadingAnimationComponent, LandUseCategoriesRecordsTabulationComponent],
            imports: [
                HttpClientTestingModule, 
                LoggerModule.forRoot({ serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.TRACE, serverLogLevel: NgxLoggerLevel.OFF })],
            providers: [
                DecimalPipe, 
                LandUseCategoriesRecordsTabulationService, 
                {
                    provide: ActivatedRoute, 
                    useValue: {
                        paramMap: of({ get: (key: string) => 1 }),
                        queryParamMap: of({ get: (key: string) => 'value' })
                    }
                }
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(LandUseCategoriesRecordsTabulationComponent);

        componentDE = fixture.debugElement;
        component = fixture.componentInstance;
        componentNE = fixture.nativeElement;

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(component).toBeDefined();
    });

    it('should display the Land Use Categories headers correctly', () => {

        // #
        const th1: HTMLTableHeaderCellElement = componentDE.query(By.css('tr th:nth-of-type(1)')).nativeElement;

        expect(th1).toBeDefined();
        expect(th1.innerText).toEqual("#");


        // Name
        const th2: HTMLTableHeaderCellElement = componentDE.query(By.css('tr th:nth-of-type(2)')).nativeElement;

        expect(th2).toBeDefined();
        expect(th2.innerText).toEqual("Name");


        // Actions
        const th3: HTMLTableHeaderCellElement = componentDE.query(By.css('tr th:nth-of-type(3)')).nativeElement;

        expect(th3).toBeDefined();
        expect(th3.innerText).toEqual("Actions");        
        
    }); 
    
    it('should trigger the search for Land Use Categories records with the specified search term', () => {

        const searchTermSetter = spyOnProperty(component.landUseCategoriesTableService, 'searchTerm', 'set');
        
        const searchComponent: DebugElement = componentDE.query(By.css('sb-search'));

        expect(searchComponent).toBeDefined();

        searchComponent.triggerEventHandler("searched", "x");

        fixture.detectChanges();

        expect(searchTermSetter).toHaveBeenCalledOnceWith("x");

    });  
    
    it('should trigger the loading of the Land Use Categories records page change', () => {

        const pageSetter = spyOnProperty(component.landUseCategoriesTableService, 'page', 'set');
        
        const paginationComponent: DebugElement = componentDE.query(By.css('sb-pagination'));

        expect(paginationComponent).toBeDefined();

        paginationComponent.triggerEventHandler("pageChanged", 3);

        fixture.detectChanges();

        expect(pageSetter).toHaveBeenCalledOnceWith(3);

    });
    
    it('should trigger the loading of the Land Use Categories records page size change', () => {

        const pageSizeSetter = spyOnProperty(component.landUseCategoriesTableService, 'pageSize', 'set');
        
        const paginationComponent: DebugElement = componentDE.query(By.css('sb-pagination'));

        expect(paginationComponent).toBeDefined();

        paginationComponent.triggerEventHandler("pageSizeChanged", 10);

        fixture.detectChanges();

        expect(pageSizeSetter).toHaveBeenCalledOnceWith(10);

    });      
    
    it('should trigger the sorting of Land Use Categories records by name', () => {

        const sortColumnSetter = spyOnProperty(component.landUseCategoriesTableService, 'sortColumn', 'set');
        const sortDirectionSetter = spyOnProperty(component.landUseCategoriesTableService, 'sortDirection', 'set');

        const th2: DebugElement = componentDE.query(By.css('tr th:nth-of-type(2)'));

        expect(th2).toBeDefined();

        // asc
        th2.triggerEventHandler('sort', {column: th2.nativeElement.getAttribute('sbSortable'), direction: "asc"});

        fixture.detectChanges();

        expect(component.sortedColumn).toEqual("name");
	    expect(component.sortedDirection).toEqual("asc");
        expect(sortColumnSetter).toHaveBeenCalledOnceWith("name");
        expect(sortDirectionSetter).toHaveBeenCalledOnceWith("asc");

        // desc
        th2.triggerEventHandler('sort', {column: th2.nativeElement.getAttribute('sbSortable'), direction: "desc"});

        fixture.detectChanges();

        expect(component.sortedColumn).toEqual("name");
	    expect(component.sortedDirection).toEqual("desc"); 
        expect(sortColumnSetter).toHaveBeenCalledTimes(2); 
        expect(sortColumnSetter).toHaveBeenCalledWith("name");
        expect(sortDirectionSetter).toHaveBeenCalledTimes(2);
        expect(sortDirectionSetter).toHaveBeenCalledWith("desc"); 


    });
        
});
