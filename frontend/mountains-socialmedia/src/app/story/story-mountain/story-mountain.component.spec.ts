import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryMountainComponent } from './story-mountain.component';

describe('StoryMountainComponent', () => {
  let component: StoryMountainComponent;
  let fixture: ComponentFixture<StoryMountainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryMountainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryMountainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
