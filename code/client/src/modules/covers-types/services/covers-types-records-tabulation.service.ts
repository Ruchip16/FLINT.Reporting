import { Injectable, OnDestroy } from '@angular/core';
import { CoversTypesDataService } from './covers-types-data.service';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, Subscription } from 'rxjs';
import { State } from '@common/models';
import { SortDirection } from '@common/directives/sortable.directive';
import { CoverType } from '../models/cover-type.model';

const LOG_PREFIX: string = "[Covers Types Records Tabulation Service]";

export interface CoverTypeState extends State {

}

@Injectable({ providedIn: 'root' })
export class CoversTypesRecordsTabulationService implements OnDestroy {

    // The user defined search or sort criteria.
    private _state: CoverTypeState = { page: 1, pageSize: 4, searchTerm: '', sortColumn: '', sortDirection: '' };

    // The first set of observables that will be updated / broadcasted whenever 
    // a background task is started or completed  
    private _loadingSubject$ = new BehaviorSubject<boolean>(false);
    private _loading$ = this._loadingSubject$.asObservable();

    // The second set of observables that will be updated / broadcasted whenever 
    // the user enters a search term or specifies a sort criteria    
    private _coversTypesSubject$ = new BehaviorSubject<CoverType[]>([]);
    private _coversTypes$ = this._coversTypesSubject$.asObservable();

    // The third set of observables that will be updated / broadcasted whenever 
    // the user enters a search term or specifies a sort criteria 
    // and Covers Types Records as a result
    private _totalSubject$ = new BehaviorSubject<number>(0);
    private _total$ = this._totalSubject$.asObservable();
  

    // A common gathering point for all the component's subscriptions.
    // Makes it easier to unsubscribe from all subscriptions when the component is destroyed.   
    private _subscriptions: Subscription[] = [];

    constructor(
        private coversTypesDataService: CoversTypesDataService,
        private log: NGXLogger) {

        this._subscriptions.push(
            this.coversTypesDataService.coversTypes$
                .subscribe(
                    (coversTypes: CoverType[]) => {
                        this.transform(coversTypes);
                    }));

    }

    ngOnDestroy() {
        this.log.trace(`${LOG_PREFIX} Destroying Service`);
        this._subscriptions.forEach((s) => s.unsubscribe());
    }


    /**
     * Returns an observable containing Covers Types Records that have been filtered as per the Current User Defined Criteria
     */
    get coversTypes$() {
        this.log.trace(`${LOG_PREFIX} Getting coversTypes$ observable`);
        this.log.debug(`${LOG_PREFIX} Current coversTypes$ observable value = ${JSON.stringify(this._coversTypesSubject$.value)}`);
        return this._coversTypes$;
    }


    /**
     * Returns an observable containing the total number of Covers Types Records that have been filtered as per the Current User Defined Criteria
     */
    get total$() {
        this.log.trace(`${LOG_PREFIX} Getting total$ observable`);
        this.log.debug(`${LOG_PREFIX} Current total$ observable value = ${JSON.stringify(this._totalSubject$.value)}`);
        return this._total$;
    }


    /**
     * Returns an observable indicating whether or not a data operation exercise (sorting, searching etc.) is currently underway
     */
    get loading$() {
        this.log.trace(`${LOG_PREFIX} Getting loading$ observable`);
        this.log.debug(`${LOG_PREFIX} Current loading$ observable value = ${JSON.stringify(this._loadingSubject$.value)}`);
        return this._loading$;
    }


    /**
     * Returns the currently active page
     */
    get page() {
        this.log.trace(`${LOG_PREFIX} Getting page detail`);
        this.log.debug(`${LOG_PREFIX} Current page detail value = ${JSON.stringify(this._state.page)}`);
        return this._state.page;
    }


    /**
     * Updates the currently set active page detail and triggers the data transformation exercise
     */
    set page(page: number) {
        this.log.trace(`${LOG_PREFIX} Setting page detail to ${JSON.stringify(page)}`);
        this.set({ page });
    }


    /**
     * Returns the currently set page size
     */
    get pageSize() {
        this.log.trace(`${LOG_PREFIX} Getting page size detail`);
        this.log.debug(`${LOG_PREFIX} Current page size detail = ${JSON.stringify(this._state.pageSize)}`);
        return this._state.pageSize;
    }


    /**
     * Updates the currently set page size detail and triggers the data transformation exercise
     */
    set pageSize(pageSize: number) {
        this.log.debug(`${LOG_PREFIX} Setting page size to ${JSON.stringify(pageSize)}`);
        this.set({ pageSize });
    }


    /**
     * Returns the currently set search term
     */
    get searchTerm() {
        this.log.debug(`${LOG_PREFIX} Getting search term detail`);
        this.log.debug(`${LOG_PREFIX} Current search term detail = ${JSON.stringify(this._state.searchTerm)}`);
        return this._state.searchTerm;
    }


    /**
     * Updates the currently set search term and triggers the data transformation exercise
     */
    set searchTerm(searchTerm: string) {
        this.log.debug(`${LOG_PREFIX} Setting search term to ${JSON.stringify(searchTerm)}`);
        this.set({ searchTerm });
    }


    /**
     * Updates the currently set sort column detail and triggers the data transformation exercise
     */
    set sortColumn(sortColumn: string) {
        this.log.debug(`${LOG_PREFIX} Setting sort column to ${JSON.stringify(sortColumn)}`);
        this.set({ sortColumn });
    }


    /**
     * Updates the currently set sort direction detail
     */
    set sortDirection(sortDirection: SortDirection) {
        this.log.debug(`${LOG_PREFIX} Setting sort direction to ${JSON.stringify(sortDirection)}`);
        this.set({ sortDirection });
    }   


    /**
     * Compares two values to find out if the first value preceeds the second.
     * When comparing string values, please note that this method is case sensitive
     * 
     * @param v1 The first value
     * @param v2 The second value
     * @returns -1 if v1 preceeds v2, 0 if v1 is equal to v2 or 1 if v1 is greater than v2
     */
    compare(v1: number | string | undefined | null, v2: number | string | undefined | null) {
        this.log.trace(`${LOG_PREFIX} Comparing two values to find out if the first value preceeds the second`);
        return (v1 == undefined || v1 == null || v2 == undefined || v2 == null) ? 0 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }


    /**
     * Sorts Covers Types Records
     * 
     * @param coversTypes The Covers Types Records to sort
     * @param column The table column to sort the records by 
     * @param direction The desired sort direction - ascending or descending
     * @returns The sorted Covers Types Records
     */
    sort(coversTypes: CoverType[], column: string, direction: string): CoverType[] {
        this.log.trace(`${LOG_PREFIX} Sorting Covers Types Records`);
        if (direction === '' || column == null) {
            return coversTypes;
        } else {
            return [...coversTypes].sort((a, b) => {
                const res = this.compare(a[column], b[column]);
                return direction === 'asc' ? res : -res;
            });
        }
    }


    /**
     * Checks if search string is present in the Cover Type record
     * 
     * @param coverType The Cover Type record
     * @param term The Search String
     * @returns A boolean result indicating whether or not a match was found
     */
    matches(coverType: CoverType, term: string): boolean {
        this.log.trace(`${LOG_PREFIX} Checking if the search string is present in the Cover Type record`);
        if (coverType != null && coverType != undefined) {

            // Try locating the search string in the Cover Type's name
            if (coverType.code != null && coverType.code != undefined) {
                if (coverType.code.toLowerCase().includes(term.toLowerCase())) {
                    return true;
                }
            }

            // Try locating the search string in the Cover Type's description
            if (coverType.description != null && coverType.description != undefined) {
                if (coverType.description.toLowerCase().includes(term.toLowerCase())) {
                    return true;
                }
            }            
        }

        return false;
    }


    /**
     * Updates the index of the Covers Types Records
     * 
     * @param coversTypes The Covers Types Records to sort
     * @returns The newly indexed Covers Types Records
     */
     index(coversTypes: CoverType[]): CoverType[] {
        this.log.trace(`${LOG_PREFIX} Indexing Covers Types Records`);
        let pos: number = 0;
        return coversTypes.map(d => {
            d.pos = ++pos;
            return d;
        });
    }    


    /**
     * Paginates Covers Types Records
     * 
     * @param coversTypes The Covers Types Records to paginate
     * @returns The paginated Covers Types Records
     */
    paginate(coversTypes: CoverType[], page: number, pageSize: number): CoverType[] {
        this.log.trace(`${LOG_PREFIX} Paginating Covers Types Records`);
        return coversTypes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    }




    /**
     * Utility method for all the class setters.
     * Updates the sort / filter criteria and triggers the data transformation exercise
     * @param patch the partially updated details
     */
    set(patch: Partial<CoverTypeState>) {

        // Update the state
        Object.assign(this._state, patch);


        // Transform the Covers Types Records
        this.transform(this.coversTypesDataService.records);

    }


    /**
     * Sorts, filters and paginates Covers Types Records
     * 
     * @param records the original Covers Types Records
     */
    transform(records: CoverType[]) {

        // Flag
        this._loadingSubject$.next(true);

        if (records.length != 0) {

            this.log.trace(`${LOG_PREFIX} Sorting, filtering and paginating Covers Types Records`);
            this.log.debug(`${LOG_PREFIX} Covers Types Records before transformation = ${JSON.stringify(records)}`);

            const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

            // Sort
            let transformed: CoverType[] = this.sort(records, sortColumn, sortDirection);
            this.log.debug(`${LOG_PREFIX} Covers Types Records after 'Sort' Transformation = ${JSON.stringify(transformed)}`);

            // Filter by Search Term
            transformed = transformed.filter(coverType => this.matches(coverType, searchTerm));
            const total: number = transformed.length;
            this.log.debug(`${LOG_PREFIX} Covers Types Records after 'Filter by Search Term' Transformation = ${JSON.stringify(transformed)}`);

            // Index
            transformed = this.index(transformed);
            this.log.debug(`${LOG_PREFIX} Covers Types Records after 'Index' Transformation = ${JSON.stringify(transformed)}`);

            // Paginate
            transformed = this.paginate(transformed, page, pageSize);
            this.log.debug(`${LOG_PREFIX} Covers Types Records after 'Paginate' Transformation = ${JSON.stringify(transformed)}`);

            // Broadcast
            this._coversTypesSubject$.next(Object.assign([],transformed));
            this._totalSubject$.next(total);


        } else {

            // Broadcast
            this._coversTypesSubject$.next([]);
            this._totalSubject$.next(0);
        }

        // Flag
        this._loadingSubject$.next(false);

    }

}
