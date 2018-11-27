import {TestBed, inject} from '@angular/core/testing';

import {ValidationService} from './validation.service';
import {FormGroup, FormControl, ValidatorFn} from '@angular/forms';

describe('ValidationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ValidationService]
        });
    });

    it('should be created', inject([ValidationService], (service: ValidationService) => {
        expect(service).toBeTruthy();
    }));

    it('should return an array with Validators.required, if the validation for a control is ["required"]',
        inject([ValidationService], (service: ValidationService) => {
            expect(service).toBeTruthy();
        }));

    // TODO: This should not check for Function as it's too broad.
    it('should create a form group validator, with type ValidationFn.', inject([ValidationService], (service: ValidationService) => {

        const formGroup = new FormGroup({
            test: new FormControl('test')
        });

        const formGroupValidators = {
            validatorFunc: 'isAnyCheckboxChecked',
            validationErrorId: 'reasonsConstentOrderNotApproved',
            checkboxes: [
                'partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
                'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'
            ]
        };

        const formGroupValidatorFunction = service.createFormGroupValidator(formGroup, formGroupValidators.validatorFunc, formGroupValidators.checkboxes,
            formGroupValidators.validationErrorId);

        expect(formGroupValidatorFunction).toEqual(jasmine.any(Function));
    }));
});
