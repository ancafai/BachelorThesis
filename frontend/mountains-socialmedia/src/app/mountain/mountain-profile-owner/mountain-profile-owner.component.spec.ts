import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainProfileComponent } from './mountain-profile-owner.component';

describe('MountainProfileComponent', () => {
  let component: MountainProfileComponent;
  let fixture: ComponentFixture<MountainProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MountainProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MountainProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
