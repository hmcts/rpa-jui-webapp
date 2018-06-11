import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CaseService {

  constructor(private httpClient: HttpClient) { }


  fetch(caseId): Observable<Object> {
        return this.httpClient.get(`/api/cases/${caseId}`);
  }

    getFixedList(listItems) {
        const obj = {};

        listItems.forEach(listItem => {
            obj[listItem.code] = listItem.label;
        });

        return obj;
    }

    transform(data) {
        const enumColumns = {};

        data.columns.forEach(column => {
            if (column.case_field_type.fixed_list_items.length) {
                enumColumns[column.case_field_id] = this.getFixedList(column.case_field_type.fixed_list_items);
            }
        });

        if (Object.keys(enumColumns).length > 0) {
            data.results.forEach(result => {
                for (const fieldName in enumColumns) {
                    result.case_fields[fieldName] = enumColumns[fieldName][result.case_fields[fieldName]];
                }
            });
        }

        return data;
    }

    search(): Observable<Object> {
        return this.httpClient
            .get('/api/cases')
            .map(data => this.transform(data));
    }
}
