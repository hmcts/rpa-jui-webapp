import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {ViewCaseComponent} from './view-case.component';
import {mockCase, mockSectionsService} from './mock/view-case.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CaseDataService} from './view-case.services';
import {LinkItem, SectionsCaseItem} from '../../../domain/models/section_fields';
import {mockActiveRouteViewCase, mockActiveRouteViewCaseEmpty} from './mock/activeRouterViewCase.mock';

class MockCaseDataService {
    getCaseData() {
        return mockCase.caseData;
    };
    getNavigation(obj, sectionTabName): Array<LinkItem> {
        return [
            {
                href: `/case/SSCS/Benefit/case_id/section_id1`,
                text: 'section_name1',
                label: 'section_name1',
                id: 'section_id1',
                active:  'section_id1' === sectionTabName
            },
            {
                href: `/case/SSCS/Benefit/case_id/section_id2`,
                text: 'section_name2',
                label: 'section_name2',
                id: 'section_id2',
                active:  'section_id2' === sectionTabName
            },
            {
                href: `/case/SSCS/Benefit/case_id/section_id3`,
                text: 'section_name3',
                label: 'section_name3',
                id: 'section_id3',
                active:  'section_id3' === sectionTabName
            }
        ];
    }
    findTargetSection(): SectionsCaseItem {
        return {
            id: 'section_id2',
            name: 'section_name2'
        };
    }
}
describe('ViewCaseComponent: Active Router Test', () => {
        let component: ViewCaseComponent;
        let fixture: ComponentFixture<ViewCaseComponent>;
        let activeRouteMock;
        let routerNavigateSpy;
        let router;


        function setupModule(providers = []) {

            TestBed.configureTestingModule({
                declarations: [ViewCaseComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [ RouterTestingModule],
                providers: [
                    { provide: ActivatedRoute, useFactory: () => activeRouteMock },
                    { provide: CaseDataService, useClass : MockCaseDataService},
                    ...providers
                ]
            }).compileComponents();

            router = TestBed.get(Router);
            routerNavigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve({}));
        }

    function createComponent() {
        fixture = TestBed.createComponent(ViewCaseComponent);
        component = fixture.componentInstance;
        activeRouteMock.params.subscribe(params => {
            params.section ? component.sectionTabName = params.section : component.sectionTabName = null;
        });
        component.case = activeRouteMock.snapshot.data['caseData'];
        fixture.detectChanges();
    }

    beforeEach(async(() => {
        activeRouteMock = mockActiveRouteViewCaseEmpty;
        return setupModule();
    }));
    it('should init ViewCaseComponent but fields not valid as State is empty', () => {
        createComponent();
        expect(component.case).toBeUndefined();
        expect(component.targetSection).toBeUndefined();
        expect(component.sectionTabName).toBeNull();
        expect(component).toBeTruthy();
    });

    // Test data
    describe('Should load data correctly', () => {
        beforeEach(async(() => {
            activeRouteMock = mockActiveRouteViewCase;
            activeRouteMock.params = Observable.of({
                section: 'section_id2'
            });
            TestBed.resetTestingModule();
            setupModule([
                {
                    provide: ActivatedRoute,
                    useValue: activeRouteMock
                }
            ]);
            createComponent();
            routerNavigateSpy();
        }));
        it('Revewing case object', () => {

            expect(component.case.id).toEqual('case_id');
            expect(component.case.sections.length).toEqual(3);
            expect(component.sectionTabName).toEqual('section_id2');
        });
        it('Sections to be mapped out based on getNavigation service', () => {
            expect(component.sections).toEqual(mockSectionsService);
        })
        it('Case: targetSection', () => {
            expect(component.targetSection).toEqual( {
                id: 'section_id2',
                name: 'section_name2'
            });
        });
        it('Case: sections should have min 1', () => {
            expect(component.case.sections[0].id).toEqual('section_id1');
        });
    });

})





