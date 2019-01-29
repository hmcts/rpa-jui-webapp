import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RotationService {
    private isButtonVisible = false;
    private showRotation = new Subject<boolean>();

    getShowRotationSub(): Subject<boolean> {
        return this.showRotation;
    }

    getButtonVisibility(): boolean {
        return this.isButtonVisible;
    }

    toggleRotation() {
        this.isButtonVisible = !this.isButtonVisible;
        this.showRotation.next(this.isButtonVisible);
    }
}
