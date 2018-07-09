import { Component, OnInit } from '@angular/core';
import {Mountain} from './shared/mountain.model';
import {MountainHomeService} from './shared/mountain-home.service';

@Component({
  selector: 'app-mountain',
  templateUrl: './mountain.component.html',
  styleUrls: ['./mountain.component.css']
})
export class MountainComponent implements OnInit {

  mountains: Mountain[];
  newMountain: Mountain = new Mountain();

  constructor( private mountainService: MountainHomeService ) { }


  ngOnInit(): void {
    this.getMountains();

  }


  getMountains(): void {

    this.mountainService.getMountains()
      .subscribe
      (mountains => {
        this.mountains = mountains;
      });

    console.log('Inside getMountains in Component: ', this.mountains);
  }

}
