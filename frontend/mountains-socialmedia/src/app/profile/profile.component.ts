import { Component, OnInit } from '@angular/core';
import {User} from './shared/user.model';
import {UserService} from './shared/user.service';
import {NgForm} from '@angular/forms';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  users: User[];
  newUser: User = new User();


  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.getUsers();

  }


  getUsers(): void {

    this.userService.getUsers()
      .subscribe
      (users => {
        this.users = users;
      });

    console.log('Inside getUsers in Component: ', this.users);
  }
    /*

  createUser(userForm: NgForm): void {
    this.userService.createUser(this.newUser)
      .then(createUser => {
        userForm.reset();
        this.newUser = new User();
        this.users.unshift(createUser);
      });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id)
      .then (() => {
        this.users = this.users.filter(user => user.id != id);
      });
  }
  */
}
