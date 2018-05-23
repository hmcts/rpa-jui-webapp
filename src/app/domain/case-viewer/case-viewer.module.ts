import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaseViewerComponent} from './components/case-viewer/case-viewer.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule

    ],
    exports: [
        CaseViewerComponent
    ],
    declarations: [CaseViewerComponent]
})
export class CaseViewerModule {
}
