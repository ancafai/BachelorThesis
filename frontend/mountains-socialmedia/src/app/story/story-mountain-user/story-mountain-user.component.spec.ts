import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryMountainUserComponent } from './story-mountain-user.component';

describe('StoryMountainUserComponent', () => {
  let component: StoryMountainUserComponent;
  let fixture: ComponentFixture<StoryMountainUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryMountainUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryMountainUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
