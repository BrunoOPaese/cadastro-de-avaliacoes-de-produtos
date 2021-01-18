import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  type: string;
  message: string;
  errors: any;

  constructor() { 
    this.type = '';
    this.message = '';
  }

  ngOnInit(): void {
  }

}
