import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
    constructor(public router: Router, private route: ActivatedRoute) {
    }
}
