import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menu = new EventEmitter<string>();
  collapsed = true;

  constructor() { }

  ngOnInit() {
  }

  onClick(element: string) {
    this.menu.emit(element);
  }

}
