import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'app-casebar-details',
    templateUrl: './casebar-details.component.html',
    styleUrls: ['./casebar-details.component.scss']
})
export class CaseBarDetailsComponent implements OnChanges {

    @Input() case: any;
    targetSection: any;

    constructor() { }

    ngOnChanges(changes) {
        if (this.case && this.case.details) {
                this.targetSection = this.case.details;
        }
    }

}