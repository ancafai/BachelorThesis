import { Component, OnInit } from '@angular/core';
import {Story} from '../shared/story.model';
import {StoryService} from '../shared/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story-all.component.html',
  styleUrls: ['./story-all.component.css']
})
export class StoryAllComponent implements OnInit {


  stories: Story[];

  constructor( private storyService: StoryService ) { }


  ngOnInit(): void {
    this.getAllStories();

  }


  getAllStories(): void {

    this.storyService.getAllStories()
      .subscribe
      (stories => {
        this.stories = stories;
      });

    console.log('Inside getStories in Component: ', this.stories);
  }

}
