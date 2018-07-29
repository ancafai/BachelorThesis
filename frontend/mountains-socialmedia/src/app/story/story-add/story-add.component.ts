import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NewStory} from '../shared/newStory.model';
import {StoryService} from '../shared/story.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MountainService} from "../../mountain/shared/mountain.service";

@Component({
  selector: 'app-story-add',
  templateUrl: './story-add.component.html',
  styleUrls: ['./story-add.component.css']
})
export class StoryAddComponent implements OnInit {

  mountainNames = [];
  story: NewStory = new NewStory('', '', '', '');
  idMountain: string;
  selectedMountain = 'Select Mountain';


  constructor( private activatedRoute: ActivatedRoute, private router: Router, private storyService: StoryService, private mountainService: MountainService ) { }

  ngOnInit() {
    this.getMountains();
  }


  createStory() {

    this.story.userId = localStorage.getItem('userId');
    this.storyService.createStory('/mountain/addstory/' + this.idMountain, this.story)
      .subscribe(data => {
        this.router.navigateByUrl('/story/getall');
      });
  }

  getMountains(): void {

    this.mountainService.getMountains()
      .subscribe
      (mountains => {
        for (const mountain of mountains) {
          this.mountainNames.push(mountain.name);
        }
      });

  }

  changeMountain(newMountain: string): void {
    this.selectedMountain = newMountain;
    this.mountainService.findByName(newMountain)
      .subscribe(
        mountainFound => {
          this.idMountain = mountainFound.id;
        }
      );
  }


}
