import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {User} from '../../model/User';
import {CustomValidatorService} from '../../service/custom-validator.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-create-account',
  styleUrls: ['./create-account.component.css'],
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent implements OnInit {

  public createAccountForm: FormGroup;
  public user: User;
  public submitted: boolean;
  public error: string;
  public isLoggedin: boolean;
  public isUsernameExists: boolean;
  public isEmailExists: boolean;
  public oldPasswordMatches: boolean;
  private confirmPassword: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private customValidatorService: CustomValidatorService, private router: Router,
              private elementRef: ElementRef, private tokenStorageService: TokenStorageService,
  ) {
    this.user = new User();
    this.submitted = false;
    this.isLoggedin = false;
  }

  public ngOnInit(): void {

    this.isLoggedin = this.tokenStorageService.isTokenGenerated();

    this.createAccountForm = this.formBuilder.group({
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, this.customValidatorService.emailValidator]],
      firstName: ['', [Validators.required, this.customValidatorService.nameValidator]],
      lastName: ['', [Validators.required, this.customValidatorService.nameValidator]],
      password: [''],
      phoneNumber: ['', [Validators.required, this.customValidatorService.phoneNumberValidator]],
      username: [{value: '', disabled: this.isLoggedin}, [Validators.required, this.customValidatorService.usernameValidator]],
    },
    {
      validator: this.customValidatorService.matchPassword('password', 'confirmPassword'),
    },
  );

    if (this.isLoggedin) {
      this.createAccountForm.addControl('oldPassword', new FormControl('', Validators.required));
      this.createAccountForm.controls["password"].setValidators([this.customValidatorService.passwordValidator]);
      this.createAccountForm.validator (this.customValidatorService.matchPassword('password', 'confirmPassword'));
    } else {
      this.createAccountForm.controls["password"].setValidators([Validators.required, this.customValidatorService.passwordValidator]);
    }

    if (this.isLoggedin) {
      this.userService.getUserDetails().subscribe(
        (response) => {this.user = response; },
        (error) => {
          alert('Either invalid credentials or something went wrong');
          this.router.navigate(['/view-all-questions']);
        });
    }

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#61B15A';
}

  public onSubmit(): void {
    this.submitted = true;
    this.isUsernameExists = false;
    this.isEmailExists = false;
    if (this.createAccountForm.invalid) {
        return;
    } else {
      /*this.userService.createUser(this.user)
        .subscribe( (data) => {
          const value = Number(data);
          if (value === 1) {
            this.isUsernameExists = true;
            return;
          } else if (value === 3) {
            this.isEmailExists = true;
            return;
          } else if (value === 2) {
            this.isUsernameExists = true;
            this.isEmailExists = true;
            return;
          } else {
            alert('User created successfully.');
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          this.error = 'Either invalid credentials or something went wrong';
        });*/
        alert("Hello");
    }
  }

  public onSave(): void {
    if (this.createAccountForm.invalid) {
      return;
    } else {
      this.oldPasswordMatches = false;
      this.isEmailExists = false;
      if (this.createAccountForm.invalid) {
        return;
      } else {
        this.userService.updateUser(this.user)
        .subscribe( (data) => {
          const value = Number(data);
          if (value === 1) {
            this.oldPasswordMatches = true;
            return;
          } else if (value === 3) {
            this.isEmailExists = true;
            return;
          } else if (value === 2) {
            this.oldPasswordMatches = true;
            this.isEmailExists = true;
            return;
          } else {
            alert('User details updated successfully.');
            location.reload();
          }
        },
        (error) => {
          alert('Either invalid credentials or something went wrong');
        });
      }
    }
  }

  public get createAccountFormControl(): {[key: string]: AbstractControl} {
    return this.createAccountForm.controls;
  }

}
