import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  fileList: FileList;
  @ViewChild('myFile') myInputVariable: ElementRef;

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

  /*
  editStory() {

    this.storyService.updateStory(this.story)
      .subscribe(data => {
        this.router.navigateByUrl('/story/getall');
      });
  }
  */

  editStory() {

    if (this.fileList != null && this.fileList !== undefined) {
      const formData: FormData = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
          const fileInput: File = this.fileList[i];
          formData.append('files', fileInput, fileInput.name);
      }
      formData.append('story', new Blob([JSON.stringify(this.story)], {
            type: 'application/json'
      }));
          this.storyService.updateStoryWithFile('/mountain/updatestory', formData)
            .subscribe(
              data => {
                console.log(data);
              },
              error => console.log(error)
            );

      }  else {
      const formData: FormData = new FormData();
      formData.append('story', new Blob([JSON.stringify(this.story)], {
        type: 'application/json'
      }));
      this.storyService.updateStoryWithFile('/mountain/updatestorynoimage', formData)
        .subscribe(
          data => {
            console.log(data);
          },
          error => console.log(error)
        );
    }

    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/user/profile');
  }

  deletePhoto() {
    this.myInputVariable.nativeElement.value = '';
  }

  fileChange(e) {
    this.fileList = e.target.files;
  }
}
