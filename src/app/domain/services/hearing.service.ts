import {Injectable} from '@angular/core';
import {Observable, EMPTY, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})

export class HearingService {

    constructor(private httpClient: HttpClient, private configService: ConfigService, private state: TransferState) { }

    generateHearingsUrl(caseId: string) {
        return `${this.configService.config.api_base_url}/api/hearings/${caseId}`;
    }

    storeDraftHearing(caseId: string, text: string): Observable<any> {
        const url = this.generateHearingsUrl(caseId);
        const key = makeStateKey(url);

        this.state.set(key, { relist_reason: text });

        return of([]);
    }

    fetchDraftHearing(caseId: string): Observable<any> {
        const url = this.generateHearingsUrl(caseId);
        const key = makeStateKey(url);

        const cache = this.state.get(key, null as any);
        return (cache) ? of(cache) : of(null);
    }
}
