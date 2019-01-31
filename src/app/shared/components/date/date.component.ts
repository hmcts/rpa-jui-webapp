import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html'
})
export class DateComponent {
    @Input() group: FormGroup;
    @Input() id;
    @Input() data;
    @Input() validate;
    @Input() showValidation;
    @Input() validationError;

    displayOneMessage(errors, controlId){
        console.log(errors);
        if(errors){
            const keys = Object.keys(errors);
            console.log(keys);
            for (const key of keys) {
                if (key.includes(controlId)) {
                    console.log( "found", key);
                    return key;
                }
            }
        }
    }

}
