import { Component, OnInit } from '@angular/core';
import {Story} from "../shared/story.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StoryService} from "../shared/story.service";
import {UserService} from "../../profile/shared/user.service";

@Component({
  selector: 'app-story-mountain-user',
  templateUrl: './story-mountain-user.component.html',
  styleUrls: ['./story-mountain-user.component.css']
})
export class StoryMountainUserComponent implements OnInit {

  stories: Story[];
  idMountain: string;
  idUser: string;
  userFound: string;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private storyService: StoryService, private userService: UserService) { }

  ngOnInit() {
    this.idMountain = this.activatedRoute.snapshot.params.idMountain;
    this.idUser = this.activatedRoute.snapshot.params.idUser;
    this.getStoriesUserMountain(this.idUser, this.idMountain);
  }

  getStoriesUserMountain(idUser: string, idMountain: string) {
    this.storyService.getStoriesUserMountain(idUser, idMountain)
      .subscribe( stories => {
        this.stories = stories;
      });

  }

  truncateDescription(descr: string): string {
      return descr.slice(0, 1070);
  }

  prelucrateImage(image: string): string {
    return 'data:image/jpg;base64,' + image;
  }

  isOwner(idUser: string): boolean {
    if (idUser === localStorage.getItem('userId')) {
      return true;
    }
    return false;
  }

  goToViewStory(storyId: string) {
    this.router.navigateByUrl('story/view/' + storyId);
  }

  goToEditStory(storyId: string) {
    this.router.navigateByUrl('story/editstory/' + storyId);
  }

  deleteStory(storyId: string) {
    if (confirm('Are you sure you want to delete this story?')) {
      this.storyService.deleteStory(storyId).subscribe(data => {
        this.storyService.getAllStories();
        this. getStoriesUserMountain(this.idUser, this.idMountain);
      });
    }
  }

}
