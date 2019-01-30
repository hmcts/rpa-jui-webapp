import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { PdfRenderService } from '../../../data/pdf-render.service';
import { EmLoggerService } from '../../../logging/em-logger.service';
import {RotationService} from './rotation.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-rotation-toolbar',
    templateUrl: './rotation.component.html',
    styleUrls: ['./rotation.component.scss'],
    providers: []
})
export class RotationComponent implements OnInit, OnDestroy {
    showRotationButton: boolean;
    rotationButtonStatusSub: Subscription;

    rotationStyle = {};

    @Input() pageNumber: number;

    constructor(private pdfRenderService: PdfRenderService,
                private log: EmLoggerService,
                private rotationService: RotationService) {
        this.log.setClass('RotationComponent');
    }

    ngOnInit() {
        this.rotationButtonStatusSub = this.rotationService.getShowRotationSub().subscribe((value) => {
            this.showRotationButton = value;
        });
        this.rotationStyle = {
            'margin-top':
                `-${(<HTMLElement>document.getElementById('pageContainer' + this.pageNumber).querySelector('.textLayer')).style.height}`
        };

    }

    ngOnDestroy() {
        if (this.rotationButtonStatusSub) {
            this.rotationButtonStatusSub.unsubscribe();
        }
    }

    calculateRotation(rotateVal): number {
        const circleDegrees = 360;
        return (rotateVal % circleDegrees + circleDegrees) % circleDegrees;
    }

    onRotateClockwise() {
        const RENDER_OPTIONS = this.pdfRenderService.getRenderOptions();
        const rotation = RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.pageNumber).rotate;
        RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.pageNumber).rotate = this.calculateRotation(rotation + 90);
        this.pdfRenderService.setRenderOptions(RENDER_OPTIONS);
        this.pdfRenderService.render();
    }
}
