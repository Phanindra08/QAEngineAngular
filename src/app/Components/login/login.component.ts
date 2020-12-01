import { Component, OnInit ,ElementRef } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AuthorizationService} from '../../service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public error: string;

  constructor(private formBuilder:FormBuilder,private authorizationService:AuthorizationService,
    private router: Router,private elementRef:ElementRef) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]]
    });
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#61B15A";
  }

  public userAuthentication():void{
    this.authorizationService.authenticate(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(
      (success)=>
      {
        this.authorizationService.registerInSession(this.loginForm.controls.username.value);
        if (success == "FAILURE") {
          this.error = 'Invalid Credentials';
          return;
        }
        this.router.navigate(['/view-all-questions']);
      },
      (error) => {
        this.error = 'Either invalid credentials or something went wrong';
      });
    }

    public goToCreateAccount():void{
      this.router.navigate(['/create-account']);
    }
  }
