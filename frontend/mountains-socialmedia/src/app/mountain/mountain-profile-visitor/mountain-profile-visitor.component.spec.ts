import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainProfileVisitorComponent } from './mountain-profile-visitor.component';

describe('MountainProfileVisitorComponent', () => {
  let component: MountainProfileVisitorComponent;
  let fixture: ComponentFixture<MountainProfileVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MountainProfileVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MountainProfileVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
