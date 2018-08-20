import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-govuk-panel',
    templateUrl: './govuk-panel.component.html',
    styleUrls: ['./govuk-panel.component.scss']
})
export class GovukPanelComponent implements OnInit {

    @Input() headingLevel = 1;
    @Input() titleText =  'Application complete';
    @Input() html = 'Your reference number<br><strong>HDJ2123F</strong>';


    constructor() { }

    ngOnInit() {
    }

}
