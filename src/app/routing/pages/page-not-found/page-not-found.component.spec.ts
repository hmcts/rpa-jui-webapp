import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PageNotFoundComponent} from './page-not-found.component';

describe('PageNotFoundComponent: Test', () => {

    let component: PageNotFoundComponent;
    let fixture: ComponentFixture<PageNotFoundComponent>;

beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [PageNotFoundComponent],
        });

        fixture = TestBed.createComponent(PageNotFoundComponent);
        component = fixture.componentInstance;
    }));

    it('should initPageNotFoundComponent', () => {
        expect(component).toBeTruthy();
    });
});
