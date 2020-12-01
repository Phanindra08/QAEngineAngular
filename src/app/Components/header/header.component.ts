import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthorizationService} from '../../service/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authorizationService:AuthorizationService,private router: Router) { }

  ngOnInit(): void {
  }

  doLogout() {
		this.authorizationService.logout();
		this.router.navigate(['/login']);
	}

}
