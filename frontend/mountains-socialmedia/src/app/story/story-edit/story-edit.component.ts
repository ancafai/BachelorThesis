import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NewStory} from '../shared/newStory.model';
import {StoryService} from "../shared/story.service";
import {Story} from "../shared/story.model";
import {MountainService} from "../../mountain/shared/mountain.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit {


  story: Story = new Story('', '', '', '', '', null, null, null);
  fileList: FileList;
  @ViewChild('myFile') myInputVariable: ElementRef;

  constructor( private _location: Location, private activatedRoute: ActivatedRoute, private router: Router, private storyService: StoryService, private mountainService: MountainService) { }

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

    if (this.story.title === '') {
      alert('Please choose a name for the story!');
    } else {
      if (this.fileList != null && this.fileList !== undefined) {
        const formData: FormData = new FormData();
        for (let i = 0; i < this.fileList.length; i++) {
          const fileInput: File = this.fileList[i];
          formData.append('files', fileInput, fileInput.name);
        }
        this.story.pictures = null;
        formData.append('story', new Blob([JSON.stringify(this.story)], {
          type: 'application/json'
        }));
        this.storyService.updateStoryWithFile('/mountain/updatestory', formData)
          .subscribe(
            data => {
              console.log(data);
              this.goBack();
            },
            error => console.log(error)
          );

      } else {
        const formData: FormData = new FormData();
        this.story.pictures = null;
        formData.append('story', new Blob([JSON.stringify(this.story)], {
          type: 'application/json'
        }));
        this.storyService.updateStoryWithFile('/mountain/updatestorynoimage', formData)
          .subscribe(
            data => {
              console.log(data);
              this.goBack();
            },
            error => console.log(error)
          );
      }
    }


  }

  goBack() {
    //this.router.navigateByUrl('/user/profile/' + localStorage.getItem('userId'));
    this._location.back();
  }

  deletePhoto() {
    this.myInputVariable.nativeElement.value = '';
  }

  fileChange(e) {
    this.fileList = e.target.files;
  }
}
