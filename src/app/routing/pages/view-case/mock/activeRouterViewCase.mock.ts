import {Observable} from 'rxjs';
import {mockCase} from './view-case.mock';

export const mockActiveRouteViewCaseEmpty = {
    params: Observable.of({}),
    fragment: Observable.of(),
    snapshot: {
        data:  {}
    }
};
export const mockActiveRouteViewCase = {
    params: Observable.of({sections:  'section_id2'}),
    fragment: Observable.of(),
    snapshot: {
        data:  mockCase
    }
};
