import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {NgForm} from '@angular/forms';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {Story} from '../../story/shared/story.model';
import {StoryService} from '../../story/shared/story.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";



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
  photo: string;


  constructor( private activatedRoute: ActivatedRoute, private userService: UserService, private storyService: StoryService, private router: Router, private domSanitizer: DomSanitizer ) { }

  ngOnInit(): void {
   // this.getUsers();
    this.getUser(this.activatedRoute.snapshot.params.userId);
    this.getStories(this.activatedRoute.snapshot.params.userId);


  }

  getUser(idUser: string): void {

    this.userService.getUser(idUser)
      .subscribe(
        user => {
          this.user = user;
          this.photo = 'data:image/jpg;base64,' + user.profilePicture;
        }
      );
  }

  isOwner(idUser: string): boolean {
    if (idUser === localStorage.getItem('userId')) {
      return true;
    }
    return false;
  }

  getStories(idUser: string): void {
      this.userService.findById(idUser)
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

    prelucrateImage(image: string): string {
      return 'data:image/jpg;base64,' + image;
    }
  goToMap() {
    if (this.isOwner(this.user.id)) {
      this.router.navigateByUrl('/mountain/getalluserowner/' + this.user.id);
    } else {
      this.router.navigateByUrl('mountain/getalluservisitor/' + this.user.id + '/' + this.user.mapType);
    }
  }

  goToAddStory() {
    this.router.navigateByUrl('/story/addstory');
  }

  goToEditStory(storyId: string) {
    this.router.navigateByUrl('story/editstory/' + storyId);
  }

  goToViewStory(storyId: string) {
    this.router.navigateByUrl('story/view/' + storyId);
  }

  deleteStory(storyId: string) {
    if (confirm('Are you sure you want to delete this story?')) {
      this.storyService.deleteStory(storyId).subscribe(data => {
        this.storyService.getAllStories();
        this.getStories(this.user.id);
      });
    }
  }
}
