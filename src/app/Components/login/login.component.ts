import { Component, ElementRef, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {TokenStorageService} from '../../service/token-storage.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoggedIn: boolean;
  public error: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private elementRef: ElementRef,
              private tokenStorage: TokenStorageService,
            ) { }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#61B15A';
  }

  public userAuthentication(): void {
      this.userService.authenticate(this.loginForm.controls.username.value, this.loginForm.controls.password.value).
      subscribe(
      (data) => {
        const dataToObject = JSON.parse(data);
        this.tokenStorage.saveToken(dataToObject.jwtToken);
        this.tokenStorage.saveUser(dataToObject);

        this.isLoggedIn = true;
        this.router.navigate(['/view-all-questions']);
      },
      (error) => {
        alert('Either invalid credentials or something went wrong');
      } );
    }

    public goToCreateAccount(): void {
      this.router.navigate(['/create-account']);
    }
  }
