import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainHomeComponent } from './mountain-home.component';

describe('MountainHomeComponent', () => {
  let component: MountainHomeComponent;
  let fixture: ComponentFixture<MountainHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MountainHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MountainHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
