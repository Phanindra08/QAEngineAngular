import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-bad-request',
  styleUrls: ['./bad-request.component.css'],
  templateUrl: './bad-request.component.html',
})
export class BadRequestComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  public ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D1C145';
  }

}
