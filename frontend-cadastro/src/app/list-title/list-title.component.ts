import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-title',
  templateUrl: './list-title.component.html',
  styleUrls: ['./list-title.component.css']
})
export class ListTitleComponent implements OnInit {

  @Input() title: string;
  @Input() link: string;
  @Input() buttonText: string; 

  constructor() {

  }

  ngOnInit(): void {
  }

}
