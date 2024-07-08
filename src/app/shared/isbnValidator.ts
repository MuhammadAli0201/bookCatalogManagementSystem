import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function iSBNValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value;

        if (!value)
            return null;

        if (checkIsInt(value.substring(0, 3)) || checkIsInt(value.substring(4, 5))
            || checkIsInt(value.substring(6, 9)) || checkIsInt(value.substring(10, 15))
            || checkIsInt(value.substring(16, 17))
        ) {
            return { isbnInvalid: true }
        }
        else if (dashCheck(value.substring(3, 4)) || dashCheck(value.substring(5, 6))
            || dashCheck(value.substring(9, 10)) || dashCheck(value.substring(15, 16))
        ) {
            return { isbnInvalid: true }
        }
        else {
            return null;
        }
    }
}

function checkIsInt(str: string) {
    return isNaN(parseInt(str, 10));
}

function dashCheck(str: string) {
    return str !== "-";
}