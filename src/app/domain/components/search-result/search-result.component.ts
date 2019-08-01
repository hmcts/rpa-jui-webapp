import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../services/case.service';
import {ErrorFormattingService} from '../../../shared/services/error-formatting.service';
import * as moment from 'moment';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    /**
     * This component has a couple of different view states, therefore assigning a static
     * string to each state; as it's cleaner and easier to read, rather than to place multiply variable conditions
     * in the html.
     */
    LOADING = 'LOADING';
    CASES_LOAD_SUCCESSFULLY = 'CASES_LOAD_SUCCESSFULLY';
    CASES_LOAD_ERROR = 'CASES_LOAD_ERROR';
    USER_HAS_NO_CASES = 'USER_HAS_NO_CASES';

    /**
     * TODO: Is CCD zero indexed or not? This would mean we start requesting the first page being 0 or 1.
     * @type {number}
     */
    FIRST_CCD_PAGE = 1;
    PAGINATION_INCREMENT = 1;

    /**
     * Initialise as no value, enabling us to check that it has been assigned a value later on.
     */
    columnsAndCases: Object = null;
    errorStackResponse: Object;
    minimalErrorStack: Object;
    humanReadableErrorStack: String;
    browserTime: String;

    componentState = this.LOADING;

    ccdPageIndex = this.FIRST_CCD_PAGE;

    constructor(private caseService: CaseService, private errorFormattingService: ErrorFormattingService) {
    }

    /**
     * Checks if the user has any cases. If they do not we display a message to the user.
     *
     * @param cases
     */
    userHasNoCases(cases) {
        return cases.message === 'JUDGE_HAS_NO_VIEWABLE_CASES';
    }

    getColumnsAndCasesSuccess(columnsAndCases) {

        if (this.userHasNoCases(columnsAndCases)) {
            this.componentState = this.USER_HAS_NO_CASES;
            return;
        }

        this.componentState = this.CASES_LOAD_SUCCESSFULLY;

        this.populateSearchResults(this.columnsAndCases, columnsAndCases);
    }

    /**
     * Populate Search Results
     *
     * If the Search Results are not populated then let's initially set the search results to be the Cases and Columns sent through.
     *
     * If the Search Results are populated then let's append the new cases to the initial cases.
     */
    populateSearchResults(prevColumnsAndCases, columnsAndCases) {

        const cases = columnsAndCases.results;
        const columns = columnsAndCases.columns;

        if (!this.searchResultsPopulated(prevColumnsAndCases)) {

            this.setSearchResult(cases, columns);
        } else {

            const prevColumns = prevColumnsAndCases.columns;
            const prevCases = prevColumnsAndCases.results;

            this.appendSearchResults(prevColumns, prevCases, cases);
        }
    }

    setSearchResult(cases, columns) {

        this.columnsAndCases = {
            results: cases,
            columns: columns,
        };
    }

    /**
     * appendSearchResults
     *
     * Note that the columns should always be the same, why they are being passed through from the backend, I'm unsure. They should
     * be available on a seperate endpoint.
     *
     * @param prevColumns
     * @param prevCases
     * @param nextCases
     */
    appendSearchResults(prevColumns, prevCases, nextCases) {

        this.setSearchResult(prevCases.concat(nextCases), prevColumns);
    }

    /**
     * Check if the search results on the page have already been populated, if they have then we're going to need to appended
     * each new cases retrieved to the cases already on the page.
     *
     * If there are no search results on the page we need to populate the page, with both columns and cases.
     *
     * It's not great that Columns are being sent through as well as cases in the same call.
     *
     * @param columnsAndCases
     * @returns {boolean}
     */
    searchResultsPopulated(columnsAndCases) {
        return Boolean(columnsAndCases);
    }

    getColumnsAndCasesError(errorStack) {

        this.componentState = this.CASES_LOAD_ERROR;

        this.errorStackResponse = errorStack.error.response.data;

        this.minimalErrorStack = this.errorFormattingService.createMinimalErrorStack(errorStack.error);
        this.humanReadableErrorStack = this.errorFormattingService.createHumanReadableStack(this.minimalErrorStack);

        this.browserTime = moment().format(`D MMMM YYYY, h:mm:ss a`);

        /**
         * Please keep the following console logs in here, as then
         * we are able to debug while with Clients / Judges.
         */
        console.log('HttpErrorResponse Error:');
        console.log(errorStack);

        console.log('Minimal Error Stack:');
        console.log(this.minimalErrorStack);

        console.log('Human Readable Error Stack:');
        console.log(this.humanReadableErrorStack);

        console.log(this.browserTime);
    }

    /**
     * Note that the minimal error stack, does not include the request, response or return objects, as this is
     * too much information to place into the view.
     */
    getColumnsAndCases(requestCcdPage) {

        const casesObservable = this.caseService.getColumnsAndCases(requestCcdPage);

        casesObservable.subscribe(
            cases => {
                this.getColumnsAndCasesSuccess(cases);
            },
            errorStack => {
                this.getColumnsAndCasesError(errorStack);
            }
        );
    }

    /**
     * TODO: We do not know if we should show the next page button as yet, as not sure if we can get the total
     * number of cases a User has from Ccd.
     */
    hasNextPage() {
    }

    /**
     * We should check if there is a previous page of Cases, if yes then we should show the previous page button.
     *
     * @param ccdPageIndex
     * @returns {boolean}
     */
    hasPreviousPage = ccdPageIndex => ccdPageIndex > this.FIRST_CCD_PAGE;

    /**
     * Retrieves the next page of CCD cases.
     *
     * @param currentCcdPageIndex
     */
    getNextPage = currentCcdPageIndex => {

        const nextCcdPageIndex = currentCcdPageIndex + this.PAGINATION_INCREMENT;

        this.getCasesAndSetCcdPageIndex(nextCcdPageIndex);
    };

    /**
     * Retrieves the previous page of CCD cases.
     *
     * @param currentCcdPageIndex
     */
    getPreviousPage = currentCcdPageIndex => {

        const prevCcdPageIndex = currentCcdPageIndex - this.PAGINATION_INCREMENT;

        this.getCasesAndSetCcdPageIndex(prevCcdPageIndex);
    };

    /**
     * getCasesAndSetCcdPageIndex
     *
     * Get the Ccd cases and maintain the Ccd Page Index.
     *
     * @param ccdPageIndex - 1
     */
    getCasesAndSetCcdPageIndex = ccdPageIndex => {

        this.setCcdPageIndex(ccdPageIndex);
        this.getColumnsAndCases(ccdPageIndex);
    };

    /**
     * setCcdPageIndex
     *
     * We maintain the state of the Ccd Page Index within the UI, so that we can request the correct previous or next Ccd page.
     *
     * @param newPageIndex
     */
    setCcdPageIndex = newPageIndex => {
        this.ccdPageIndex = newPageIndex;
    };

    /**
     * Initialise the page with the first page of Ccd Cases.
     */
    ngOnInit() {

        this.getColumnsAndCases(this.ccdPageIndex);
    }
}
