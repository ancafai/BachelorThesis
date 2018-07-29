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
    this.storyService.getStoriesUserMountain(this.idUser, this.idMountain)
      .subscribe( stories => {
        this.stories = stories;
      });
  }

    truncateDescription(descr: string): string {
      return descr.slice(0, 200);
    }

  goToViewStory(storyId: string) {
    this.router.navigateByUrl('story/view/' + storyId);
  }


}
