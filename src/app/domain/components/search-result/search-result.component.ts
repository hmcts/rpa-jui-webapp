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

    cases: Object;
    errorStackResponse: Object;
    minimalErrorStack: Object;
    humanReadableErrorStack: String;
    browserTime: String;

    componentState = this.LOADING;

    ccdPageIndex = 0;

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

    getCasesSuccess(cases) {

        if (this.userHasNoCases(cases)) {
            this.componentState = this.USER_HAS_NO_CASES;
            return;
        }

        this.componentState = this.CASES_LOAD_SUCCESSFULLY;



        this.cases = cases;

        console.log('set cases');
        console.log(this.cases);
    }

    getCasesError(errorStack) {

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
    getCases(requestCcdPage) {

        const casesObservable = this.caseService.getCases(requestCcdPage);

        casesObservable.subscribe(
            cases => {
                this.getCasesSuccess(cases);
            },
            errorStack => {
                this.getCasesError(errorStack);
            }
        );
    }

    getNextPage() {

        ++this.ccdPageIndex;
        this.getCases(this.ccdPageIndex);
    }

    getPreviousPage() {

        --this.ccdPageIndex;
        this.getCases(this.ccdPageIndex);
    }

    /**
     * When we move out logic into seperate functions they become easier to test in Angular, otherwise we
     * have to mock.
     */
    ngOnInit() {

        const initCcdPageIndex = 0;

        this.getCases(initCcdPageIndex);
    }
}
