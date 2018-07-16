import {Component, OnInit, ViewChild} from '@angular/core';
import {NavbarComponent} from './shared/navbar.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor() {}

  ngOnInit() {
  }


}
