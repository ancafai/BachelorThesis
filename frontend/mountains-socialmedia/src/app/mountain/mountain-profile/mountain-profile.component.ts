import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Mountain} from "../shared/mountain.model";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {UserService} from "../../profile/shared/user.service";
import {MountainService} from "../shared/mountain.service";


const apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;
declare var require: any;

const defaultCoords: number[] = [40, -80];
const defaultZoom = 8;

@Component({
  selector: 'app-mountain-profile',
  templateUrl: './mountain-profile.component.html',
  styleUrls: ['./mountain-profile.component.css']
})

export class MountainProfileComponent implements OnInit {

  mapType = 'streets';

  constructor(private mountainService: MountainService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.plotMap();
  }


  updateMapType() {
    console.log('BEFORE UPDATE' + this.mapType);
    this.userService.findByName(localStorage.getItem('username'))
      .subscribe( userFound => {
        userFound.mapType = this.mapType;
        localStorage.setItem('mapType', this.mapType);
        this.userService.updateUser(userFound)
          .subscribe( userUpdated =>
            console.log('Maptype updated: ' + userUpdated.mapType)
          );
        }
      );
  }

  plotMap() {
    const myStyle = {
      'weight': 2,
      'opacity': 1
    };

    const map = L.map('map').setView(defaultCoords, defaultZoom);
    map.maxZoom = 100;

    const listStyles = ['mapbox.dark', 'mapbox.streets', 'mapbox.light', 'mapbox.comic', 'mapbox.satellite'];

    const mapLayer = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.' + localStorage.getItem('mapType'),
      maxZoom: 15,
      accessToken: apiToken
    }).addTo(map);

    const dark = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: listStyles[0],
      maxZoom: 15,
      accessToken: apiToken
    });

    const streets = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: listStyles[1],
      maxZoom: 15,
      accessToken: apiToken
    });


    const light = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: listStyles[2],
      maxZoom: 15,
      accessToken: apiToken
    });

    const comic = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: listStyles[3],
      maxZoom: 15,
      accessToken: apiToken
    });

    const satellite = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: listStyles[4],
      maxZoom: 15,
      accessToken: apiToken
    });



    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    const switchLayer = (layer) => {
      const layerId = layer.target.id;

      if (layerId.toString() === 'streets') {
        streets.addTo(map);
        streets.bringToFront();
        this.mapType = 'streets';
      }

      if (layerId.toString() === 'dark') {
        dark.addTo(map);
        dark.bringToFront();
        this.mapType = 'dark';
      }


      if (layerId.toString() === 'light') {
        light.addTo(map);
        light.bringToFront();
        this.mapType = 'light';
      }
      if (layerId.toString() === 'comic') {
        comic.addTo(map);
        comic.bringToFront();
        this.mapType = 'comic';
      }
      if (layerId.toString() === 'satellite') {
        satellite.addTo(map);
        satellite.bringToFront();
        this.mapType = 'satellite';
      }
      console.log(layerId);
    };

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].onclick = switchLayer;
    }


    const customLayer = L.geoJson(null, {

      style:
        function (feature) {
          return {weight: 2, opacity: 0.5, fillOpacity: 0.5, color: '#2f1e1e'};
        }

    });


    const geoJsonLayer = omnivore.geojson('../../../assets/mountains.geojson', null, customLayer)
      .on('ready', function () {
        map.fitBounds(geoJsonLayer.getBounds());
      }).addTo(map);

    const onMountainClick = (e) => {

      const mountainFound: Observable<Mountain> = this.mountainService.findByName(e.layer.feature.properties.DENUMIRE);
      mountainFound.subscribe(mountain => {
        console.log('id: ', mountain.id);
        this.router.navigateByUrl('/story/getstoriesofmountain/' + mountain.id);
        // e.layer.setStyle({weight: 2, opacity: 0.5, fillOpacity: 0.5, color: e.layer.feature.properties.color});
      });


    };

    geoJsonLayer.on('click', onMountainClick);


  }

}
