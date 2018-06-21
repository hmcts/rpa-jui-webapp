import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-timeline-panel',
    templateUrl: './timeline-panel.component.html',
    styleUrls: ['./timeline-panel.component.scss']
})
export class TimelinePanelComponent implements OnInit {

    @Input()
    events;

    constructor() {
    }

    ngOnInit() {
    }

}
