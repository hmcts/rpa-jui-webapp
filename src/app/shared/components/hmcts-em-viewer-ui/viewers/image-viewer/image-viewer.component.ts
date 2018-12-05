import { Component, Input, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
    
    @Input() url: string;
    @Input() originalUrl: string;

    @ViewChild('img') img: ElementRef;
    rotation: number;

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        this.rotation = 0;
    }

    onRotateClockwise() {
        this.rotation = this.rotation + 90;
        this.rotateImage();
    }

    onRotateAntiClockwise() {
        this.rotation = this.rotation - 90;
        this.rotateImage();
    }

    rotateImage() {
        const styles = ['transform', '-ms-transform', '-o-transform', '-moz-transform', '-webkit-transform'];
        for (const style of styles) {
            this.renderer.setStyle(this.img.nativeElement, style, `rotate(${this.rotation}deg)`);
        }
    }
}
