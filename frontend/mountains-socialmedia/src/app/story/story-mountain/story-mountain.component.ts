import { Component, OnInit } from '@angular/core';
import {Story} from '../shared/story.model';
import {StoryService} from '../shared/story.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Response} from '@angular/http';
import {UserService} from "../../profile/shared/user.service";

@Component({
  selector: 'app-story-mountain',
  templateUrl: './story-mountain.component.html',
  styleUrls: ['./story-mountain.component.css']
})
export class StoryMountainComponent implements OnInit {

  stories: Story[];
  idMountain: string;
  userFound: string;
  pagedStories: Story[];
  pages = [];
  currentPage: number;


  constructor( private activatedRoute: ActivatedRoute, private router: Router, private storyService: StoryService, private userService: UserService ) { }


  ngOnInit(): void {
    this.idMountain = this.activatedRoute.snapshot.params.idMountain;
    this.getStoriesPaginated(this.idMountain, 1);
    this.getStoriesMountain(this.idMountain);

  }

  prelucrateImage(image: string): string {
    return 'data:image/jpg;base64,' + image;
  }

  getStoriesPaginated(idMountain: string, currentPage: number): void {
    this.storyService.getStoriesMountainPaginated(idMountain, currentPage)
      .subscribe(
        storiesFound => {
          this.pagedStories = storiesFound;
          this.currentPage = currentPage;
        }
      );
  }

  getStoriesMountain(mountainId: string): void {

    this.storyService.getStoriesMountain(mountainId)
      .subscribe
      (stories => {
        this.stories = stories;
        for (let i = 1; i <= Math.ceil(stories.length / 12); i++) {
          this.pages.push(i);
        }
      });

    console.log('Inside getStories in Component: ', this.stories);
  }


  truncateDescription(descr: string): string {
    return descr.slice(0, 275);
  }




  goToViewStory(storyId: string) {
    this.router.navigateByUrl('story/view/' + storyId);
  }

}
