import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Mountain} from "../shared/mountain.model";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../profile/shared/user.service";
import {MountainService} from "../shared/mountain.service";
import {StoryService} from "../../story/shared/story.service";
import set = Reflect.set;
import {User} from "../../profile/shared/user.model";


const apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;
declare var require: any;

const defaultCoords: number[] = [40, -80];
const defaultZoom = 8;

@Component({
  selector: 'app-mountain-profile',
  templateUrl: './mountain-profile-owner.component.html',
  styleUrls: ['./mountain-profile-owner.component.css']
})

export class MountainProfileOwnerComponent implements OnInit {

  mapType = 'streets';
  colorRegion: string;
  user: User = new User();

  constructor(private activatedRoute: ActivatedRoute, private mountainService: MountainService, private userService: UserService, private storyService: StoryService, private router: Router) { }

  ngOnInit() {
    this.getUser(this.activatedRoute.snapshot.params.userId);
    this.plotMap();
  }

  getUser(idUser: string): void {

    this.userService.getUser(idUser)
      .subscribe(
        user => {
          this.user = user;
        }
      );
  }




  updateMapType() {
    console.log('BEFORE UPDATE' + this.mapType);
    this.userService.findByName(this.user.username)
      .subscribe( userFound => {
        userFound.mapType = this.mapType;
        localStorage.setItem('mapType', this.mapType);
        this.userService.updateUser(userFound)
          .subscribe( userUpdated => {
              console.log('Maptype updated: ' + userUpdated.mapType);
              alert('Style of the map has been changed to ' + userUpdated.mapType);
            }
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

    const listStyles = ['mapbox.outdoors', 'mapbox.streets', 'mapbox.light', 'mapbox.comic', 'mapbox.streets-satellite', 'mapbox.pencil', 'mapbox.pirates', 'mapbox.high-contrast'];

    const mapLayer = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.' + localStorage.getItem('mapType'),
      maxZoom: 15,
      accessToken: apiToken
    }).addTo(map);

    const outdoors = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
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

    const pencil = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: listStyles[5],
      maxZoom: 15,
      accessToken: apiToken
    });
    const pirates = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: listStyles[6],
      maxZoom: 15,
      accessToken: apiToken
    });
    const highcontrast = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: listStyles[7],
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

      if (layerId.toString() === 'outdoors') {
        outdoors.addTo(map);
        outdoors.bringToFront();
        this.mapType = 'outdoors';
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
      if (layerId.toString() === 'pencil') {
        pencil.addTo(map);
        pencil.bringToFront();
        this.mapType = 'pencil';
      }
      if (layerId.toString() === 'pirates') {
        pirates.addTo(map);
        pirates.bringToFront();
        this.mapType = 'pirates';
      }
      if (layerId.toString() === 'high-contrast') {
        highcontrast.addTo(map);
        highcontrast.bringToFront();
        this.mapType = 'high-contrast';
      }
      console.log(layerId);
    };

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].onclick = switchLayer;
    }

    const setStyle = () => {

      geoJsonLayer.eachLayer((layerNew) => {
        this.mountainService.findByName(layerNew.feature.properties.DENUMIRE)
          .subscribe( mountain => {
            this.storyService.getColorRegion(localStorage.getItem('userId'), mountain.id)
              .subscribe( color => {
                layerNew.setStyle({
                  weight: 2, opacity: 0.5, fillOpacity: 0.5, color: color
                });
              });
          });

        });



    };


    const customLayer = L.geoJson(null, {

    });



    const geoJsonLayer = omnivore.geojson('../../../assets/mountains.geojson', null, customLayer)
      .on('ready', function () {
        map.fitBounds(geoJsonLayer.getBounds());
        setStyle();
      }).addTo(map);




    const onMountainClick = (e) => {

      const mountainFound: Observable<Mountain> = this.mountainService.findByName(e.layer.feature.properties.DENUMIRE);
      mountainFound.subscribe(mountain => {
        console.log('id: ', mountain.id);
        console.log('name: ', mountain.name);
        this.router.navigateByUrl('/story/getstoriesofmountainuser/' + this.user.id + '/' + mountain.id);
        // e.layer.setStyle({weight: 2, opacity: 0.5, fillOpacity: 0.5, color: e.layer.feature.properties.color});
      });


    };


    geoJsonLayer.on('click', onMountainClick);

    geoJsonLayer.on('mouseover', function(e) {

      e.layer.setStyle({
        fillOpacity: 0.7
      });
    const popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(e.layer.feature.properties.DENUMIRE)
        .openOn(map);
    });

    geoJsonLayer.on('mouseout', function(e) {
      e.layer.setStyle({
        fillOpacity: 0.5
      });
    });



  }

}
