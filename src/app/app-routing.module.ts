import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
//
const routes: Routes = [
    { path: '/', component: HomeComponent },
    { path: '/feedback', component: FeedbackComponent },
];


@NgModule({
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
