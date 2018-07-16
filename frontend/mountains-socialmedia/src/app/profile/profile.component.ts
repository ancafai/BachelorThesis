import { Component, OnInit } from '@angular/core';
import {User} from './shared/user.model';
import {UserService} from './shared/user.service';
import {NgForm} from '@angular/forms';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {Story} from "../story/shared/story.model";
import {StoryService} from "../story/shared/story.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  users: User[];
  user: User = new User();
  stories: Story[];
  nbstories: number;


  constructor( private userService: UserService, private storyService: StoryService, private router: Router ) { }

  ngOnInit(): void {
   // this.getUsers();
    this.getUser();
    this.getStories();

  }

  getUser(): void {

    this.userService.getUser()
      .subscribe(
        user =>
          this.user = user
      );
  }

  getUsers(): void {

    this.userService.getUsers()
      .subscribe(
        users =>
          this.users = users
      );
  }

  getStories(): void {
      this.userService.findByName(localStorage.getItem('username'))
        .subscribe(
          userStories => {
            this.storyService.getStoriesUser(userStories.id)
              .subscribe(
                storiesFound => {
                  this.stories = storiesFound;
                  this.nbstories = storiesFound.length;
                }
              );
          }
        );
    }

    truncateDescription(descr: string): string {
      return descr.slice(0, 310);
    }

  goToMap() {
    this.router.navigateByUrl('/mountain/getalluser');
  }
}
