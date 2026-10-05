import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CourseTracker } from './course-tracker';

describe('CourseTracker', ()=> {

  let component: CourseTracker;
  let fixture: ComponentFixture<CourseTracker>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseTracker]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CourseTracker);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});