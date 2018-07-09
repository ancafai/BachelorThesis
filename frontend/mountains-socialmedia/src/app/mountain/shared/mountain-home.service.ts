
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Mountain } from './mountain.model';
import { NewMountain } from './newMountain.model';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';



const apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;
declare var require: any;

const defaultCoords: number[] = [40, -80];
const defaultZoom = 8;

@Injectable()
export class MountainHomeService {
  private mountainsUrl = 'http://localhost:8080';

  constructor(private http: Http,
              private router: Router) {}

  getMountains():  Observable<Mountain[]> {
    return this.http.get(this.mountainsUrl + '/mountain/getall/')
      .map(this.extractMountains)
      .catch(this.handleError);
  }


  findByName(name: string): Observable<Mountain> {
    return this.http.get(this.mountainsUrl + '/mountain/getbyname/' + name)
      .map(this.extractDataMountain)
      .catch(this.handleError);
  }

  private extractDataMountain(res: Response) {
    const body = res.json();
    return body || {};
  }


  private extractMountains(res: Response) {
    const body = res.json().mountainDtoList || {};
    return body;
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  plotMap() {
    const myStyle = {
      'weight': 2,
      'opacity': 1
    };

    const map = L.map('map').setView(defaultCoords, defaultZoom);
    map.maxZoom = 100;

    const listStyles = ['mapbox.dark', 'mapbox.streets', 'mapbox.light', 'mapbox.comic', 'mapbox.satellite'];

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
    }).addTo(map);


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

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].onclick = switchLayer;
    }

    function switchLayer(layer) {
      const layerId = layer.target.id;

      if (layerId.toString() === 'streets') {
        streets.addTo(map);
        streets.bringToFront();
      }

      if (layerId.toString() === 'dark') {
        dark.addTo(map);
        dark.bringToFront();
      }


      if (layerId.toString() === 'light') {
        light.addTo(map);
        light.bringToFront();
      }
      if (layerId.toString() === 'comic') {
        comic.addTo(map);
        comic.bringToFront();
      }
      if (layerId.toString() === 'satellite') {
        satellite.addTo(map);
        satellite.bringToFront();
      }
      console.log(layerId);
    }


    const customLayer = L.geoJson(null, {

      style:
        function(feature){
          return {weight: 2, opacity: 0.5, fillOpacity: 0.5, color: '#2f1e1e'};
        }

    });



      const geoJsonLayer = omnivore.geojson('../../../assets/mountains.geojson', null, customLayer)
        .on('ready', function () {
          map.fitBounds(geoJsonLayer.getBounds());
        }).addTo(map);

      const onMountainClick = (e) => {

        const mountainFound: Observable<Mountain> = this.findByName(e.layer.feature.properties.DENUMIRE);
        mountainFound.subscribe( mountain => {
          console.log('id: ', mountain.id);
          this.router.navigateByUrl('/story/getstoriesofmountain/' + mountain.id);
          // e.layer.setStyle({weight: 2, opacity: 0.5, fillOpacity: 0.5, color: e.layer.feature.properties.color});
        });



      };

      geoJsonLayer.on('click', onMountainClick);



    }


}
