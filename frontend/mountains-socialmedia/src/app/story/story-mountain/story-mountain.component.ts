import { Component, OnInit } from '@angular/core';
import {Story} from '../shared/story.model';
import {StoryService} from '../shared/story.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Response} from '@angular/http';

@Component({
  selector: 'app-story-mountain',
  templateUrl: './story-mountain.component.html',
  styleUrls: ['./story-mountain.component.css']
})
export class StoryMountainComponent implements OnInit {

  stories: Story[];
  idMountain: string;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private storyService: StoryService ) { }


  ngOnInit(): void {
    this.idMountain = this.activatedRoute.snapshot.params.idMountain;
    this.getStoriesMountain(this.idMountain);

  }


  getStoriesMountain(mountainId: string): void {

    this.storyService.getStoriesMountain(mountainId)
      .subscribe
      (stories => {
        this.stories = stories;
      });

    console.log('Inside getStories in Component: ', this.stories);
  }





}
