import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MountainHomeService} from '../shared/mountain-home.service';

@Component({
  selector: 'app-mountain-home',
  templateUrl: './mountain-home.component.html',
  styleUrls: ['./mountain-home.component.css']
})
export class MountainHomeComponent implements OnInit {

  constructor(private mountainService: MountainHomeService) { }

  ngOnInit() {


    this.mountainService.plotMap();
  }

}
