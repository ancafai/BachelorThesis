
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user.model';
import { NewUser } from './newUser.model';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {Story} from '../../story/shared/story.model';

@Injectable()
export class UserService {
  private usersUrl = 'http://localhost:8080';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getUsers():  Observable<User[]> {
    return this.http.get(this.usersUrl + '/user/getall/')
      .map(this.extractUsers)
      .catch(this.handleError);
  }

  private extractUsers(res: Response) {
    const body = res.json().userDtoList || {};
    return body;
  }

  private extractDataUser(res: Response) {
    const body = res.json();
    return body || {};
  }



  createUser(urlNew: string, user): Observable<User> {
    let st = '';
    st = JSON.stringify(user);
    console.log('Json sent: ', st);
    return this.http.post(this.usersUrl + urlNew, st, { headers: this.headers})
      .map(this.extractDataUser)
      .catch(this.handleError);
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
