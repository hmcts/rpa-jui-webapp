import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ViewerAnchorDirective} from './viewer-anchor.directive';
import {DocumentViewerService} from './document-viewer.service';
import { ViewerFactoryService } from '../viewers/viewer-factory.service';
import { UrlFixerService } from '../data/url-fixer.service';

@Component({
    selector: 'app-document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnChanges, OnInit {

    @ViewChild(ViewerAnchorDirective) viewerAnchor: ViewerAnchorDirective;
    @Input() url = '';
    @Input() annotate: boolean;
    @Input() page = 1;
    @Input() baseUrl: string;

    // todo make a class
    mimeType: string;
    docName: string;
    viewerComponent: any;
    error: string;

    constructor(private viewerFactoryService: ViewerFactoryService,
                private urlFixer: UrlFixerService,
                private documentViewerService: DocumentViewerService) {
    }


    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.url || changes.annotate) {
            this.buildComponent();
        }
    }

    buildComponent() {
        if (!this.url) {
            throw new Error('url is a required arguments');
        }
        this.documentViewerService.fetch(`${this.urlFixer.fixDm(this.url, this.baseUrl)}`).subscribe(resp => {
            if (resp && resp._links) {
                this.docName = resp.originalDocumentName;
                this.viewerComponent =
                    this.viewerFactoryService.buildViewer(resp, this.annotate, this.viewerAnchor.viewContainerRef, this.baseUrl);
            }
        }, err => {
            this.error = err;
        });
    }
}
