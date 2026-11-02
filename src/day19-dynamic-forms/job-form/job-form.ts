import { Component, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import type { Job } from '../models/job';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './job-form.html',
  styleUrl: './job-form.css'
})
export class JobForm {
  readonly applications = signal<Job[]>([]);
  readonly successMessage = signal('');

  readonly jobForm = new FormGroup({
    company: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2)
      ]
    }),

    position: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    
    skills: new FormArray<FormControl<string>>([
      this.createSkillControl()
    ])
  });

  get skills(): FormArray<FormControl<string>> {
    return this.jobForm.controls.skills;
  }

  private createSkillControl(): FormControl<string> {
    return new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]  
    });
  }

  addSkill(): void {
    this.skills.push(this.createSkillControl());
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }
  
  submitApplication(): void {
    this.successMessage.set('');

    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    const formValue = this.jobForm.getRawValue();

    const application: Job = {
      id: Date.now(),
      company: formValue.company.trim(),
      position: formValue.position.trim(),
      skills: formValue.skills.map(skill => skill.trim())
    };

    this.applications.update(current => [
      ...current,
      application
    ]);

    this.successMessage.set(
      'Job application added successfully!'
    );

    this.jobForm.reset();
    this.skills.clear();
    this.addSkill();
  }

  deleteApplication(id: number): void {
    this.applications.update(current =>
      current.filter(job => job.id !== id)  
    );
  }
}