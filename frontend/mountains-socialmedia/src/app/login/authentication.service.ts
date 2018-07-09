import {Injectable} from '@angular/core';
import {GlobalApp} from '../helpers/global';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {User} from '../profile/shared/user.model';

@Injectable()
export class AuthenticationService {

  private loginUrl = 'http://localhost:8080';
  authenticated = false;

  constructor(private http: Http) {}

  public login(username: string, password: string) {

    return this.http.get(this.loginUrl + '/user/login')
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json().principal;
        if (user) {
          // store user details  in local storage to keep user logged in between page refreshes
          localStorage.setItem('username', JSON.stringify(username));
        }
      });
  }


  logout() {
    localStorage.removeItem('username');
  }
}
