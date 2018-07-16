
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

  getUser(): Observable<User> {
    return this.http.get( this.usersUrl + '/user/getbyusername/' + localStorage.getItem('username'))
      .map(this.extractDataUser)
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

  updateUser(user): Observable<User> {
    return this.http.put(this.usersUrl + '/user/update/', user)
      .map(this.extractDataUser)
      .catch(this.handleError);
  }

  findByName(name: string): Observable<User> {
    return this.http.get(this.usersUrl + '/user/getbyusername/' + name)
      .map(this.extractDataUser)
      .catch(this.handleError);
  }

  findById(id: string): Observable<User> {
    return this.http.get( this.usersUrl + '/user/getbyid/' + id)
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

  register(user: NewUser) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.usersUrl + '/user/register', user)
      .map(res => res.text());
  }

  login(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.usersUrl + '/user/login/' + username + '/' + password)
      .map(res => res.text() ? res.json() : res);
  }


}
