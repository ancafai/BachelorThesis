import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/user/getall').subscribe(data => {
      this.users = data;
    });
  }

}
