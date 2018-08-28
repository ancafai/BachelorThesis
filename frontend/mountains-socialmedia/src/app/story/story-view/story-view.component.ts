import {Component, OnInit, ViewChild} from '@angular/core';
import {Story} from "../shared/story.model";
import {StoryService} from "../shared/story.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../profile/shared/user.service";



@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.css']
})


export class StoryViewComponent implements OnInit {

  story: Story = new Story('', '', '', '', '', null, null, null);
  userFound: string;
  photos: Array<string> = new Array<string>();

  constructor(private activatedRoute: ActivatedRoute, private storyService: StoryService, private userService: UserService) { }



  ngOnInit() {
    this.getById();
    this.getUserName();
  }

  getById() {
    this.storyService.getById(this.activatedRoute.snapshot.params.storyid)
      .subscribe( storyFound => {
          this.story = storyFound;
          if (storyFound.pictures != null) {
            for (const picture of storyFound.pictures) {
              this.photos.push('data:image/jpg;base64,' + picture);
            }
          }
        }
      );
  }

  getUserName() {
    this.storyService.getUserByStoryId(this.activatedRoute.snapshot.params.storyid)
      .subscribe( user => {
          this.userFound = user.username;

        }
      );
  }

}
