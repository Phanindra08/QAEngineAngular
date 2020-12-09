import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  styleUrls: ['./page-not-found.component.css'],
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {

  constructor(private location: Location, private elementRef: ElementRef) { }

  public ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D1C145';
  }

  public goBack(): void {
    this.location.back();
  }

}
