import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';
import {Input} from '@angular/core';
import {FormsModule} from '@angular/forms';

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ TextareaComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
