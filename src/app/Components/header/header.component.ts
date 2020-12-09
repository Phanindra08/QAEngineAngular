import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  public ngOnInit(): void {
  }

  public doLogout(): void {
    this.tokenStorageService.logout();
    this.router.navigate(['/login']);
  }
}
