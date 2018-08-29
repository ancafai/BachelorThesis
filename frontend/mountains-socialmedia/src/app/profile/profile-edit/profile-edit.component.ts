import {Component, ElementRef, OnInit} from '@angular/core';
import {User} from "../shared/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StoryService} from "../../story/shared/story.service";
import {UserService} from "../shared/user.service";
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: User = new User('', '', '', '', '', '', 0, '', '', '');
  fileList: FileList;
  photo: string;
  @ViewChild('myFile') myInputVariable: ElementRef;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getByUsername();

  }

  getByUsername() {
    this.userService.findByName(localStorage.getItem('username'))
      .subscribe( userEdit => {
          this.user = userEdit;
          this.photo = 'data:image/jpg;base64,' + userEdit.profilePicture;
        }
      );
  }

  deletePhoto() {
    this.myInputVariable.nativeElement.value = '';
    this.user.profilePicture = '';
  }

  editUser() {

    if (this.fileList != null && this.fileList !== undefined) {
      const formData: FormData = new FormData();
      const file: File = this.fileList[0];
      formData.append('file', file, file.name);
      formData.append('user', new Blob([JSON.stringify(this.user)], {
        type: 'application/json'
      }));
      this.userService.updateWithFile('/user/update/image', formData)
        .subscribe(
          data => {
            console.log(data);
            this.goBack();
          },
          error => console.log(error)
        );
    } else {
      const formData: FormData = new FormData();
      formData.append('user', new Blob([JSON.stringify(this.user)], {
        type: 'application/json'
      }));
      this.userService.updateWithFile('/user/update/noimage', formData)
        .subscribe(
          data => {
            console.log(data);
            this.goBack();
          },
          error => console.log(error)
          );
       }

  }


    /*
    this.userService.updateUser(this.user)
      .subscribe(data => {
        this.router.navigateByUrl('/user/profile');
      });
      */

  goBack() {
    this.router.navigateByUrl('/user/profile/' + localStorage.getItem('userId'));
  }

  fileChange(e) {
    this.fileList = e.target.files;
  }

}
