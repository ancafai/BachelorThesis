import {User} from '../profile/shared/user.model';

export class GlobalApp {

  constructor() {
  }

  public localStorageItem(id: string): string {
    if (localStorage.getItem(id)) {
      return localStorage.getItem(id);
    } else {
      return '';
    }
  }

  public setLocalStorage(user: User) {
    if (user.id) {
      localStorage.setItem('id', user.id.toString());
    } else {
      localStorage.setItem('id', '');
    }
    localStorage.setItem('username', user.username);
    if (user.firstName) {
      localStorage.setItem('firstName', user.firstName);
    } else {
      localStorage.setItem('firstName', '');
    }
    if (user.lastName) {
      localStorage.setItem('lastName', user.lastName);
    } else {
      localStorage.setItem('lastName', '');
    }
    if (user.mail) {
      localStorage.setItem('mail', user.mail);
    } else {
      localStorage.setItem('mail', '');
    }
    if (user.points) {
      localStorage.setItem('points', user.points.toString());
    } else {
      localStorage.setItem('points', '0');
    }
    if (user.picture) {
      localStorage.setItem('picture', user.picture);
    } else {
      localStorage.setItem('picture', '');
    }
    if (user.mapType) {
      localStorage.setItem('mapType', user.mapType);
    } else {
      localStorage.setItem('mapType', '');
    }
  }
}

