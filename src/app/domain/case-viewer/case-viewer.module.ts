import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaseViewerComponent} from './components/case-viewer/case-viewer.component';
import {SharedModule} from '../../shared/shared.module';
import {PanelComponent} from "./components/panel/panel.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule

    ],
    exports: [
        CaseViewerComponent
    ],
    declarations: [
        CaseViewerComponent,
        PanelComponent
    ]
})
export class CaseViewerModule {
}
