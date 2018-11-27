import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionsPanelComponent} from './questions-panel.component';
import {CaseViewerModule} from '../../case-viewer.module';
import {Selector} from '../../../../../../test/selector-helper';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../../../../config.service';
import {mockQuestion, mockQuestionEmpty, mockQuestions2, mockQuestionsPanelData} from './mock/mock-questions.mock';
import {api_base_url} from '../../../../enviorment.mock';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageDateQuestion} from '../../../models/section_fields';
import {mockActiveRouteQuestionsPanel} from './mock/activeRoute.mock';
@Component({
    selector: `app-host-dummy-component`,
    template: `<app-questions-panel [panelData]="data"></app-questions-panel>`
})
class TestQuestionsPanelDummyHostComponent {
    private data: PageDateQuestion = mockQuestion;
    @ViewChild(QuestionsPanelComponent)
    public QuestionsPanelComponent: QuestionsPanelComponent;
}
describe('Testing @input', () => {
    let testHostComponent: TestQuestionsPanelDummyHostComponent;
    let testHostFixture: ComponentFixture<TestQuestionsPanelDummyHostComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuestionsPanelComponent, TestQuestionsPanelDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestQuestionsPanelDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    it('should fail panelData as not be passed through', () => {
        expect(testHostComponent.QuestionsPanelComponent.panelData).toBeUndefined();
    });
    it('should pass panelData as not be passed through', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent.QuestionsPanelComponent.panelData).toBeDefined();
        expect(testHostComponent.QuestionsPanelComponent.panelData.fields[0].value.length).toEqual(1);
    });
    it('panelData questions should be 2', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent.QuestionsPanelComponent.panelData.fields[0].value.length).toEqual(1);
        expect(testHostComponent.QuestionsPanelComponent.panelData.fields[0].value instanceof Array).toBeTruthy();
    });
})


describe('QuestionsPanelComponent', () => {
    let component: QuestionsPanelComponent;
    let fixture: ComponentFixture<QuestionsPanelComponent>;
    let nativeElement;
    let mockConfigService;

    beforeEach(() => {
        mockConfigService = {
            config: {
                api_base_url: api_base_url
            }
        };
    });

    describe('when no create param is in the url', () => {
        describe('When there is one round of draft questions to appellant', () => {
            beforeEach(async(() => {
                TestBed
                    .configureTestingModule({
                        imports: [
                            CaseViewerModule,
                            RouterTestingModule
                        ],
                        declarations: []
                    })
                    .compileComponents();
            }));

            const data = mockQuestion;

            beforeEach(async(() => {
                fixture = TestBed.createComponent(QuestionsPanelComponent);
                component = fixture.componentInstance;
                component.panelData = data;
                nativeElement = fixture.nativeElement;
                fixture.detectChanges();
            }));

            it('should create', () => {
                expect(component)
                    .toBeTruthy();
            });

            it('should display a list of draft questions to appellant', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                    .toBe(2);
            });

            it('should display details of when draft questions were added', () => {
                expect(nativeElement.querySelector(Selector.selector('draft-questions-details')).textContent)
                    .toBe('You have not sent these questions to the appellant.');
            });

            it('should display two draft questions', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                    .toBe(2);
            });

            it('should display two draft questions headings with a link to the associated question', () => {
                const links = nativeElement.querySelectorAll(Selector.selector('questions-subject-link'));
                expect(links[0].attributes.href.value)
                    .toEqual('/be8ac935-ed7a-47b5-84ce-b5aa25e64512');
                expect(links[1].attributes.href.value)
                    .toEqual('/c7935438-b54c-4dad-bbe8-34fff72caf81');
            });

            it('should display two draft questions meta data', () => {
                const metadata = nativeElement.querySelectorAll(Selector.selector('questions-meta-data'));
                expect(metadata[0].textContent)
                    .toBe('Last updated by 5899 on 13 July 2018 at 8:52am');
                expect(metadata[1].textContent)
                    .toBe('Last updated by 5899 on 14 July 2018 at 8:52am');
            });

            it('should display link to add more draft questions', () => {
                expect(nativeElement.querySelector(Selector.selector('create-draft-questions-link')).textContent)
                    .toBe('Add questions');
                expect(nativeElement.querySelector(Selector.selector('create-draft-questions-link')).attributes.href.value)
                    .toEqual('/new/1');
            });

            it('should display link to send all draft questions', () => {
                expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')).textContent)
                    .toBe('Send questions');
                expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')).attributes.href.value)
                    .toEqual('/check/1');
            });
        });
    });

    describe('When there are no draft questions to appellant', () => {
        beforeEach(async(() => {
            TestBed
                .configureTestingModule({
                    imports: [
                        CaseViewerModule,
                        RouterTestingModule
                    ],
                    declarations: [],
                    providers: [
                        {
                            provide: ConfigService,
                            useValue: mockConfigService
                        }
                    ]
                })
                .compileComponents();
        }));

        const data = mockQuestionEmpty;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(QuestionsPanelComponent);
            component = fixture.componentInstance;
            component.panelData = data;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
        }));

        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        xit('should display round 1 title', () => {
            expect(nativeElement.querySelector(Selector.selector('round-1')).textContent)
                .toBe('Round 1');
        });

        xit('should display details of why no draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-questions-details')).textContent)
                .toBe('You haven’t asked any questions.');
        });

        xit('should display link to add draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-add-questions-link')).textContent)
                .toBe('Add questions');
            expect(nativeElement.querySelector(Selector.selector('no-draft-add-questions-link')).attributes.href.value)
                .toEqual('/new/1');
        });

        it('should not display link to send all draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')))
                .toBeFalsy();
        });

        it('should see no draft questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('draft-questions-list')).length)
                .toBe(0);
        });
    });

    describe('When there are sent questions to appellant', () => {
        beforeEach(async(() => {
            TestBed
                .configureTestingModule({
                    imports: [
                        CaseViewerModule,
                        RouterTestingModule
                    ],
                    declarations: [],
                    providers: [
                        {
                            provide: ConfigService,
                            useValue: mockConfigService
                        }
                    ]
                })
                .compileComponents();
        }));

        const data = mockQuestionsPanelData;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(QuestionsPanelComponent);
            component = fixture.componentInstance;
            component.panelData = data;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
        }));

        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        it('should display round 1 title', () => {
            expect(nativeElement.querySelector(Selector.selector('round-1')).textContent)
                .toBe('Round 1');
        });

        xit('should display round 2 title', () => {
            expect(nativeElement.querySelector(Selector.selector('round-2')).textContent)
                .toBe('Round 2');
        });

        xit('should display details of why no draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-questions-details')).textContent)
                .toBe('You haven’t asked any questions.');
        });

        xit('should display link to add draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-add-questions-link')).textContent)
                .toBe('Add questions');
            expect(nativeElement.querySelector(Selector.selector('no-draft-add-questions-link')).attributes.href.value)
                .toEqual('/new/2');
        });

        it('should display sent questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                .toBe(2);
        });

        it('should display a message to say when the questions were sent', () => {
            expect(nativeElement.querySelector(Selector.selector('sent-questions-details')).textContent)
                .toEqual('You sent 2 questions to the appellant at 8:52am on 13 July 2018');
        });
    });

    describe('When there are answers from appellant', () => {
        beforeEach(async(() => {
            TestBed
                .configureTestingModule({
                    imports: [
                        CaseViewerModule,
                        RouterTestingModule
                    ],
                    declarations: [],
                    providers: [
                        {
                            provide: ConfigService,
                            useValue: mockConfigService
                        }
                    ]
                })
                .compileComponents();
        }));

        const data = mockQuestions2;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(QuestionsPanelComponent);
            component = fixture.componentInstance;
            component.panelData = data;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
        }));

        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        it('should display sent questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                .toBe(2);
        });

        it('should display a message to say when the questions were sent', () => {
            expect(nativeElement.querySelector(Selector.selector('questions-issued-meta-data')).textContent)
                .toEqual('Sent by 5899 on 14 July 2018 at 8:52am');
        });

        it('should display a message to say when the answer was sent', () => {
            expect(nativeElement.querySelector(Selector.selector('questions-answered-meta-data')).textContent)
                .toEqual('Responded by Appellant on 13 July 2018 at 8:52am');
        });
    });
});

