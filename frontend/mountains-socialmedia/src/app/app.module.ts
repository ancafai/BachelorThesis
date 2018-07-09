import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from './profile/shared/user.service';
import { MountainComponent } from './mountain/mountain.component';
import {MountainHomeService} from './mountain/shared/mountain-home.service';
import { MountainHomeComponent } from './mountain/mountain-home/mountain-home.component';
import {StoryAllComponent} from './story/story-all/story-all.component';
import {StoryService} from './story/shared/story.service';
import { StoryMountainComponent } from './story/story-mountain/story-mountain.component';
import { StoryAddComponent } from './story/story-add/story-add.component';
import {AuthenticationService} from "./login/authentication.service";

const appRoutes: Routes = [
  {
    path: 'user/getall',
    component: ProfileComponent,
    data: { title: 'Users List' }
  },
  {
    path: 'mountain/getall',
    component: MountainHomeComponent,
    data: { title: 'Mountains List' }
  },
  {
    path: 'story/getall',
    component: StoryAllComponent,
    data: { title: 'Stories List' }
  },
  {
    path: 'story/getstoriesofmountain/:idMountain',
    component: StoryMountainComponent,
    data: { title: 'Stories List' }
  },
  {
    path: 'story/addstory/:idMountain',
    component: StoryAddComponent,
    data: { title: 'Stories List' }
  },
  {
    path: 'user/login',
    component: LoginComponent,
    data: { title: 'Login' }
  },


  { path: '',
    redirectTo: 'user/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    MountainComponent,
    MountainHomeComponent,
    StoryAllComponent,
    StoryMountainComponent,
    StoryAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ AuthenticationService,
                UserService,
                MountainHomeService,
                StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
