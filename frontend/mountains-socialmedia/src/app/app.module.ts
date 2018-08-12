import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './profile/profile-view/profile.component';
import {UserService} from './profile/shared/user.service';
import { MountainHomeComponent } from './mountain/mountain-home/mountain-home.component';
import {StoryService} from './story/shared/story.service';
import { StoryMountainComponent } from './story/story-mountain/story-mountain.component';
import { StoryAddComponent } from './story/story-add/story-add.component';
import { RegisterComponent } from './register/register.component';
import {AngularMaterialModule} from './angular-material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar.component';
import { StoryEditComponent } from './story/story-edit/story-edit.component';
import { MountainProfileOwnerComponent } from './mountain/mountain-profile-owner/mountain-profile-owner.component';
import {MountainService} from './mountain/shared/mountain.service';
import { StoryViewComponent } from './story/story-view/story-view.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { StoryMountainUserComponent } from './story/story-mountain-user/story-mountain-user.component';
import { MountainProfileVisitorComponent } from './mountain/mountain-profile-visitor/mountain-profile-visitor.component';


const appRoutes: Routes = [
  {
    path: 'user/profile/:userId',
    component: ProfileComponent,
    data: { title: 'User Profile' }
  },
  {
    path: 'mountain/getall',
    component: MountainHomeComponent,
    data: { title: 'Mountains List' }
  },
  {
    path: 'mountain/getalluserowner/:userId',
    component: MountainProfileOwnerComponent,
    data: { title: 'Mountains List' }
  },
  {
    path: 'mountain/getalluservisitor/:userId/:mapType',
    component: MountainProfileVisitorComponent,
    data: { title: 'Mountains List' }
  },
  {
    path: 'story/getstoriesofmountain/:idMountain',
    component: StoryMountainComponent,
    data: { title: 'Stories List' }
  },
  {
    path: 'story/getstoriesofmountainuser/:idUser/:idMountain',
    component:  StoryMountainUserComponent,
    data: { title: 'Stories List' }
  },

  {
    path: 'story/addstory',
    component: StoryAddComponent,
    data: { title: 'Stories List' }
  },
  {
    path: 'user/login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'user/register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'story/editstory/:storyid',
    component: StoryEditComponent,
    data: { title: 'Story edit' }
  },
  {
    path: 'story/view/:storyid',
    component: StoryViewComponent,
    data: { title: 'Story view' }
  },
  { path: 'user/profileedit',
    component: ProfileEditComponent,
    data: { title: 'Profile edit' }
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
    MountainHomeComponent,
    StoryMountainComponent,
    StoryAddComponent,
    RegisterComponent,
    NavbarComponent,
    StoryEditComponent,
    MountainProfileOwnerComponent,
    StoryViewComponent,
    ProfileEditComponent,
    StoryMountainUserComponent,
    MountainProfileVisitorComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [  UserService,
                MountainService,
                StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
