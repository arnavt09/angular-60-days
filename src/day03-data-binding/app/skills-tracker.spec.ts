import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SkillsTracker } from './skills-tracker';
import { Skills } from "../../app/skills/skills";

describe('SkillsTracker', () => {

  let component: SkillsTracker;
  let fixture: ComponentFixture<SkillsTracker>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
        imports: [SkillsTracker]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsTracker);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});