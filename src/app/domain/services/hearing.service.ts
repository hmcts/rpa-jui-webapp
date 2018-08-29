import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class HearingService {
    localToken: string;
    constructor(private httpClient: HttpClient, private configService: ConfigService, private state: TransferState) { }

    generateHearingsUrl(caseId: string) {
        return `${this.configService.config.api_base_url}/api/hearings/${caseId}`;
    }

    storeDraftHearing(caseId: string, text: string): Observable<any> {
        const url = this.generateHearingsUrl(caseId);
        const key = makeStateKey(url);

        this.state.set(key, { relist_reason: text });
        console.log('creating cache ---> and state --->', this.state);
        this.localToken = text;
        return of([]);
    }

    getLocalToken(): string {
        return this.localToken;
    }

    fetchDraftHearing(caseId: string): Observable<any> {
        const url = this.generateHearingsUrl(caseId);
        const key = makeStateKey(url);

        console.log('localToken', this.localToken);
        console.log('key cache ---> and state --->', this.state);

        const cache = this.state.get(key, null as any);
        console.log('cache received --->', cache);

        return (cache) ? of(cache) : of(null);
    }

    listForHearing(caseId: string, hearing: any): Observable<any> {
        // const url = this.generateHearingsUrl(caseId);
        //
        // const body = {
        //     relist_reason: hearing.relist_reason,
        //     hearing_state: 'continuous_online_hearing_relisted'
        // };

        return of([]);
    }

    fetch(caseId: string): Observable<any> {
        this.localToken = 'hey Token';
        console.log('coming from resolve');
        return of(null);
    }
}
