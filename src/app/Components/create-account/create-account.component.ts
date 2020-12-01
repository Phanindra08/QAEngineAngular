import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {User} from '../../model/User';
import {CustomValidatorService} from '../../service/custom-validator.service';
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

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private customValidatorService: CustomValidatorService,
  ) {
    this.user = new User();
    this.submitted = false;
  }

  public ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      firstName: ['', [Validators.required, this.customValidatorService.nameValidator]],
      lastName: ['',[Validators.required,this.customValidatorService.nameValidator.bind(this)]],
      email: ['', [Validators.required,this.customValidatorService.emailValidator]],
      username:['', [Validators.required,this.customValidatorService.usernameValidator]],
      phoneNumber: ['', [Validators.required,this.customValidatorService.phoneNumberValidator]],
      password:['', [Validators.required,this.customValidatorService.passwordValidator]]
      confirmPassword:['', [Validators.required]]
    },
    {
      validator: this.customValidatorService.matchPassword('password', 'confirmPassword'),
    }
  ); }

  public onSubmit(): void {
    this.submitted = true;
    if (this.createAccountForm.invalid) {
      /*this.userService.createUser(this.user)
        .subscribe( data => {
          alert("User created successfully.");
        });*/
        console.log('invalid');
        return;
    } else {
      alert('hello');
    }
  }

  public get createAccountFormControl() {
    return this.createAccountForm.controls;
  }

}
