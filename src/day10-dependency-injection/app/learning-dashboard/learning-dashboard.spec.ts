import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LearningDashboard } from './learning-dashboard';

describe('LearningDashboard', () => {

  let component: LearningDashboard;
  let fixture: ComponentFixture<LearningDashboard>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [LearningDashboard]
    }).compileComponents();

    fixture = TestBed.createComponent(LearningDashboard);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});