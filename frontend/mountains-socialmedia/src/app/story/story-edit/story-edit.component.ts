import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NewStory} from '../shared/newStory.model';
import {StoryService} from "../shared/story.service";
import {Story} from "../shared/story.model";
import {MountainService} from "../../mountain/shared/mountain.service";

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit {


  story: Story = new Story('', '', '', '', '', null, null, null);

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private storyService: StoryService, private mountainService: MountainService) { }

  ngOnInit() {

    this.getById();

  }

  getById() {
    this.storyService.getById(this.activatedRoute.snapshot.params.storyid)
      .subscribe( storyFound => {
          this.story = storyFound;
        }
      );
  }
  editStory() {

    this.storyService.updateStory(this.story)
      .subscribe(data => {
        this.router.navigateByUrl('/story/getall');
      });
  }

}
