import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MountainService} from '../shared/mountain.service';
import {Observable} from 'rxjs/Observable';
import {Mountain} from '../shared/mountain.model';
import {environment} from '../../../environments/environment';

const apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;
declare var require: any;

const defaultCoords: number[] = [40, -80];
const defaultZoom = 8;

@Component({
  selector: 'app-mountain-home',
  templateUrl: './mountain-home.component.html',
  styleUrls: ['./mountain-home.component.css']
})


export class MountainHomeComponent implements OnInit {

  mountain = 'Map';

  constructor(private mountainService: MountainService, private router: Router) { }

  ngOnInit() {

    this.plotMap();
  }

  plotMap() {
    const myStyle = {
      'weight': 2,
      'opacity': 1
    };

    const map = L.map('map').setView(defaultCoords, defaultZoom);
    map.maxZoom = 100;

    const dark = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets',
      maxZoom: 15,
      accessToken: apiToken
    }).addTo(map);


    const customLayer = L.geoJson(null, {

      style:
        function(feature) {
          return {weight: 2, opacity: 0.5, fillOpacity: 0.5, color: '#2f1e1e'};
        }

    });



    const geoJsonLayer = omnivore.geojson('../../../assets/mountains.geojson', null, customLayer)
      .on('ready', function () {
        map.fitBounds(geoJsonLayer.getBounds());
      }).addTo(map);

    const onMountainClick = (e) => {

      const mountainFound: Observable<Mountain> = this.mountainService.findByName(e.layer.feature.properties.DENUMIRE);
      mountainFound.subscribe( mountain => {
        console.log('id: ', mountain.id);
        this.router.navigateByUrl('/story/getstoriesofmountain/' + mountain.id);
      });



    };

    const onMountainOver = (e) => {

      const mountainFound: Observable<Mountain> = this.mountainService.findByName(e.layer.feature.properties.DENUMIRE);
      mountainFound.subscribe( mountain => {
          if (e.layer.options.color === '#2f1e1e') {
            e.layer.setStyle({weight: 2, opacity: 0.5, fillOpacity: 0.5, color: 'red'});
         //   console.log(e.layer);
           this.mountain = e.layer.feature.properties.DENUMIRE;
          } else {
            e.layer.setStyle({weight: 2, opacity: 0.5, fillOpacity: 0.5, color: '#2f1e1e'});
            this.mountain = 'Map';
          }
      });
    };


    geoJsonLayer.on('click', onMountainClick);
    geoJsonLayer.on('mouseover', onMountainOver);
    geoJsonLayer.on('mouseout', onMountainOver);



  }
  }
