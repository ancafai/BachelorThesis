import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {UserService} from "../profile/shared/user.service";
import {NewUser} from "../profile/shared/newUser.model";
import {AuthenticationService} from "./authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  users: any;
  user: NewUser = new NewUser('', '', '', '', '');
  errorMessage: string;


  constructor(private router: Router,
              private authService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.user.username, this.user.password)
      .subscribe(data => {
        console.log('username: ' + localStorage.getItem('username'));
        this.router.navigateByUrl('/mountain/getall/');
        }
      );
  }
}
