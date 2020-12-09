import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {

  constructor() { }

  public nameValidator(control: AbstractControl) {
    const regex = new RegExp('^[a-zA-z][a-zA-Z ]*$');
    if (!regex.test(control.value)) {
      return{invalidName: true};
    } else {
      return null;
    }
  }

  public usernameValidator(control: AbstractControl) {
    const regex = new RegExp('^[A-Za-z][A-za-z0-9_]{6,12}$');
    if (!regex.test(control.value)) {
      return{invalidUsername: true};
    } else {
      return null;
    }
  }

  public emailValidator(control: AbstractControl) {
    const regex = new RegExp('^[A-Za-z][A-za-z0-9.]*@[A-Za-z.]+\\.[A-Za-z]{2,3}$');
    if (!regex.test(control.value)) {
      return{invalidEmailAddress: true};
    } else {
      return null;
    }
  }

  public phoneNumberValidator(control: AbstractControl) {
    const regex = new RegExp('^[1-9][0-9]{9}$');
    if (!regex.test(control.value)) {
      return{invalidPhoneNumber: true};
    } else {
      return null;
    }
  }

  public passwordValidator(control: AbstractControl) {
    const matchedCase: string[] = new Array();
    matchedCase.push('[!@#$%^&*,.?_/|><]'); // Special Charector
    matchedCase.push('[A-Z]');      // Uppercase Alpabates
    matchedCase.push('[0-9]');      // Numbers
    matchedCase.push('[a-z]');     // Lowercase Alphabates
    // Check the conditions
    let count = 0;
    for (let i = 0; i < matchedCase.length; i++) {
      if (new RegExp(matchedCase[i]).test(control.value)) {
        count++;
      }
    }

    // Display it
    let color = '';
    let strength = '';
    switch (count) {
      case 0:
      case 1: {
        strength = 'Very Weak Password';
        //color = "red";
        break;
      }
      case 2: {
        strength = 'Weak Password';
        //color = "red";
        break;
      }
      case 3: {
        strength = 'Medium Password';
        //color = "orange";
        break;
      }
      case 4: {
        strength = 'Strong Password';
        //color = "green";
        break;
      }
    }
    return {strength: strength};
  }

  public matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}
}
