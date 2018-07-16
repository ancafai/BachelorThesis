
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
export class MountainService {
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




}
