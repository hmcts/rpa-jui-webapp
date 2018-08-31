import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Selector } from '../../../../../test/selector-helper';
import { DomainModule } from '../../../domain/domain.module';
import { CaseViewerModule } from '../../../domain/case-viewer/case-viewer.module';
import { TabsComponent } from './tabs.component';

describe('Component: TabsComponent', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;
    let activeRouteMock;
    let routerNavigateSpy;
    let router;

    beforeEach(async(() => {
        activeRouteMock = {
            params: Observable.of({
                section: 'parties',
                jur: 'SSCS',
                casetype: 'Benefit',
                case_id: '1234',
                section_item_id: 'petitioner'
            }),
            snapshot: {
                data: {
                    'id': 'parties-tabs',
                    'name': 'Parties',
                    'type': 'parties-panel',
                    'sections': [
                        {
                            'id': 'petitioner',
                            'name': 'Petitioner',
                            'type': 'tab',
                            'fields': [
                                {
                                    'label': 'Full name',
                                    'value': ['David ', 'Francis']
                                },
                                {
                                    'label': 'Date of birth',
                                    'value': '7 June 1981'
                                },
                                {
                                    'label': 'Address',
                                    'value': '24 Park Road<br>Lewisham<br>London<br>E11 4PR'
                                },
                                {
                                    'label': 'Phone',
                                    'value': '07787 557 967'
                                },
                                {
                                    'label': 'Email',
                                    'value': 'david.francis@gmail.com'
                                },
                                {
                                    'label': 'Representative',
                                    'value': 'Unrepresented'
                                }
                            ]
                        },
                        {
                            'id': 'respondent',
                            'name': 'Respondent',
                            'type': 'tab',
                            'fields': [
                                {
                                    'label': 'Full name',
                                    'value': ['Susan ', 'Francis']
                                },
                                {
                                    'label': 'Date of birth',
                                    'value': '16 April 1979'
                                },
                                {
                                    'label': 'Address',
                                    'value': '89 London Road<br>Hinckley<br>London<br>LE10 1HH'
                                },
                                {
                                    'label': 'Phone',
                                    'value': '07700 900 772'
                                },
                                {
                                    'label': 'Email',
                                    'value': 'susan.francis@gmail.com'
                                },
                                {
                                    'label': 'Representative',
                                    'value': 'Unrepresented'
                                }
                            ]
                        }
                    ]
                }
            }
        };
        return setupModule();
    }));

    function setupModule(providers = []) {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [DomainModule, CaseViewerModule, RouterTestingModule],
            providers: [
                { provide: ActivatedRoute, useFactory: () => activeRouteMock },
                ...providers
            ]
        }).compileComponents();

        router = TestBed.get(Router);
        routerNavigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve({}));
    }

    function createComponent() {
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
        activeRouteMock.params.subscribe(params => {
            component.params = params;
        });
        component.data = activeRouteMock.snapshot.data;
        console.log(component.data);
        component.tabContent = component.data.sections[0];
        fixture.detectChanges();
    }

    beforeEach(() => {
        createComponent();
    });

    it('should create PartiesComponent', () => {
        expect(component).toBeTruthy();
    });

    describe('when parties page loaded', () => {
        it('should create links for each tab', () => {
            expect(component.data.sections.length).toEqual(2);
        });
        it('should redirect to the first tab\'s url', () => {
            activeRouteMock.params = Observable.of({
                section: 'parties',
                jur: 'SSCS',
                casetype: 'Benefit',
                case_id: '1234'
            });
            TestBed.resetTestingModule();
            setupModule([
                {
                    provide: ActivatedRoute,
                    useValue: activeRouteMock
                }
            ]);
            createComponent();
            expect(routerNavigateSpy).toHaveBeenCalledWith(['/jurisdiction/SSCS/casetype/Benefit/viewcase/1234/parties/petitioner']);
        });

        it('should render tab\'s data', () => {
            const labelElements = document.querySelectorAll(Selector.selector('parties-panel-component|parties-tab-label'));
            const valueElements = document.querySelectorAll(Selector.selector('parties-panel-component|parties-tab-value'));
            for (const index of component.tabContent.fields.keys()) {
                expect(component.tabContent.fields[index].label).toEqual(labelElements[index].innerHTML);
                expect(component.tabContent.fields[index].value).toEqual(valueElements[index].innerHTML);
            }
        });

        it('should switch tabs', () => {
            const titleElementBeforeSwitch = document.querySelector(Selector.selector('parties-panel-component|parties-tab-title'));
            activeRouteMock.params = Observable.of({
                section: 'parties',
                jur: 'SSCS',
                casetype: 'Benefit',
                case_id: '1234',
                section_item_id: 'respondent'
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
            const titleElementAfterSwitch = document.querySelector(Selector.selector('parties-panel-component|parties-tab-title'));
            expect(titleElementBeforeSwitch).not.toEqual(titleElementAfterSwitch);
        });
    });
});
