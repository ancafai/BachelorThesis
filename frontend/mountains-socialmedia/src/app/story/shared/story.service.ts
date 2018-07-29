
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import {environment} from '../../../environments/environment';
import {Story} from './story.model';
import {MountainService} from '../../mountain/shared/mountain.service';
import {Mountain} from '../../mountain/shared/mountain.model';
import {User} from "../../profile/shared/user.model";




@Injectable()
export class StoryService {
  private storiesUrl = 'http://localhost:8080';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getStoriesMountain(mountainId: string):  Observable<Story[]> {

    return this.http.get(this.storiesUrl + '/mountain/getstories/' + mountainId)
      .map(this.extractStories)
      .catch(this.handleError);
  }

  getStoriesUser(userId: string):  Observable<Story[]> {

    return this.http.get(this.storiesUrl + '/mountain/getstoriesuser/' + userId)
      .map(this.extractStories)
      .catch(this.handleError);
  }

  getStoriesUserMountain(userId: string, mountainId: string): Observable<Story[]> {

    return this.http.get(this.storiesUrl + '/mountain/getstoriesusermountain/' + userId + '/' + mountainId)
      .map(this.extractStories)
      .catch(this.handleError);
  }


  getColorRegion(userId: string, mountainId: string): Observable<string> {
    return this.http.get(this.storiesUrl + '/mountain/getcolorregion/' + userId + '/' + mountainId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllStories():  Observable<Story[]> {

    return this.http.get(this.storiesUrl + '/mountain/getallstories')
      .map(this.extractStories)
      .catch(this.handleError);
  }

  getById(storyId: string): Observable<Story> {
    return this.http.get( this.storiesUrl + '/mountain/getstorybyid/' + storyId)
      .map(this.extractDataStory)
      .catch(this.handleError);
  }

  getUserByStoryId(storyId: string): Observable<User> {
    return this.http.get(this.storiesUrl + '/mountain/getuserbystoryid/' + storyId)
      .map(this.extractDataStory)
      .catch(this.handleError);
  }

  createStory(urlNew: string, story): Observable<Story> {
    let st = '';
    st = JSON.stringify(story);
    console.log('Json sent: ', st);
    return this.http.post(this.storiesUrl + urlNew, st, { headers: this.headers})
      .map(this.extractDataStory)
      .catch(this.handleError);
  }

  updateStory(story): Observable<Story> {
    let st = '';
    st = JSON.stringify(story);
    return this.http.put(this.storiesUrl + '/mountain/updatestory', story, { headers: this.headers})
      .map(this.extractDataStory)
      .catch(this.handleError);
  }

  updateStoryWithFile(url, formData: FormData): Observable <any> {
    return this.http.put(this.storiesUrl + url, formData)
      .map(response => response)
      .catch(error => Observable.throw(error));
  }


  deleteStory(storyId: string): Observable<void> {
    return this.http.delete(this.storiesUrl + '/mountain/deletestory/' + storyId)
      .map(() => null)
      .catch(this.handleError);

  }

  private extractStories(res: Response) {
    const body = res.json().storyDtoList || {};
    return body;
  }

  private extractDataStory(res: Response) {
    const body = res.json();
    return body || {};
  }

  private extractData(res: Response) {
    const body = res.text();  // If response is a JSON use json()
    if (body) {
      return body || {};
    } else {
      return {};
    }
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
