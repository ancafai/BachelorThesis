import { Component, OnInit } from '@angular/core';
import {NewStory} from '../shared/newStory.model';
import {StoryService} from '../shared/story.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-story-add',
  templateUrl: './story-add.component.html',
  styleUrls: ['./story-add.component.css']
})
export class StoryAddComponent implements OnInit {

  story: NewStory = new NewStory('', '', '', '');
  idMountain: string;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private storyService: StoryService ) { }

  ngOnInit() {
    this.idMountain = this.activatedRoute.snapshot.params.idMountain;
  }


  createStory() {

    this.storyService.createStory('/mountain/addstory/' + this.idMountain, this.story)
      .subscribe(data => {
        this.router.navigateByUrl('/story/getall');
      });
  }


}
