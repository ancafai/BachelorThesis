import { Component, OnInit } from '@angular/core';
import {UserService} from "../profile/shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = '';
  password = '';
  mail = '';
  firstName = '';
  lastName = '';


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    localStorage.setItem('username', '');
    localStorage.setItem('userId', '');
  }

  register() {
    const user = {
      username : this.username,
      mail: this.mail,
      password : this.password,
      firstName: this.firstName,
      lastName: this.lastName
    };

    this.userService.register(user).subscribe(data => {
      console.log('data: ' + data);
      if (data === 'GOOD') {
        localStorage.setItem('username', this.username);
        this.userService.findByName(this.username)
          .subscribe(userFound => {
              localStorage.setItem('userId', userFound.id);
            if (userFound.mapType != null) {
              localStorage.setItem('mapType', userFound.mapType);
            } else {
              localStorage.setItem('mapType', 'streets');
            }
            }
          );
        console.log('local storage is: ' + localStorage.getItem('username'));
        this.router.navigateByUrl('/mountain/getall');
      } else if (data === 'fields empty') {
        alert('All fields are required');
      } else {
        alert('Username already exists');
      }
    });
  }
}
