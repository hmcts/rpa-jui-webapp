import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Event, NavigationEnd, NavigationStart, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {LinkItem, PageDateCase, SectionsCaseItem} from '../../../domain/models/section_fields';
import {CaseDataService} from './view-case.services';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-view-case',
    templateUrl: './view-case.component.html',
    styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit, OnDestroy {
    public routerSubscription: Subscription;
    public case: PageDateCase;
    public sections: Array<LinkItem> = [];
    public sectionTabName: string | null;
    public targetSection: SectionsCaseItem | null;

    constructor(public router: Router, private route: ActivatedRoute, private caseDataService: CaseDataService) {
        this.case = this.route.snapshot.data['caseData'];
        this.route.params.subscribe((params: any) => {
            params.section ? this.sectionTabName = params.section : this.sectionTabName = null;
        });
    }

    ngOnInit() {
        // TODO revisit this when components initialisation bug is fixed
        this.routerSubscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.setNavigationSections();
            }
        });
        if (this.case && !this.sections.length) {
            this.setNavigationSections();
        }
        if (this.case) {
            this.targetSection = this.caseDataService.findTargetSection(this.case, this.sectionTabName);
        }
        if (!this.targetSection) {
            if (this.sections[0]) {
                this.router.navigate([this.sections[0].id], {relativeTo: this.route})
                    .catch(err => {
                            console.error(err);
                            this.router.navigate(['']);
                        }
                    );
            } else {
                this.router.navigate(['']);
            }
        }
    }
    private setNavigationSections(): void {
        this.sections = this.caseDataService.getNavigation(this.case, this.sectionTabName);
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

}
