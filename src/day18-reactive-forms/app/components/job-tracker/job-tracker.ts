import { Component, inject } from "@angular/core";
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  Validators 
} from "@angular/forms";

import {
  ApplicationStatus,
  JobApplication
} from '../../models/job-application';

import { JobService } from "../../services/job.service";
import { companyNameValidator } from "../../validators/company-name.validator";

@Component({
  selector: 'app-job-tracker',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './job-tracker.html',
  styleUrl: './job-tracker.css'
})
export class JobTracker {

  private fb = inject(FormBuilder);
  private jobService = inject(JobService);
  
  jobs: JobApplication[] = [];
  editingId: number | null = null;
  submitted = false;

  statuses: ApplicationStatus[] = [
    'Applied',
    'Interview',
    'Offer',
    'Rejected'
  ];

  jobForm = this.fb.nonNullable.group({
    company: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        companyNameValidator()
      ]
    ],
    position: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    status: [
      'Applied' as ApplicationStatus,
      [Validators.required]
    ],
    appliedDate: [
      '',
      [Validators.required]
    ]
  });

  constructor() {
    this.refreshJobs();
  }

  get f() {
    return this.jobForm.controls;
  }

  get totalApplications(): number {
    return this.jobs.length;
  }

  get interviewCount(): number {
    return this.jobs.filter(
      job => job.status === 'Interview'
    ).length;
  }

  refreshJobs(): void {
    this.jobs = this.jobService.getJobs();
  }

  saveApplication(): void {
    this.submitted = true;

    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    const values = this.jobForm.getRawValue();

    const job: JobApplication = {
        id: this.editingId ?? Date.now(),
        company: values.company.trim(),
        position: values.position.trim(),
        email: values.email.trim(),
        status: values.status,
        appliedDate: values.appliedDate
    };

    if (this.editingId !== null) {
      this.jobService.updateJob(job);
    } else {
      this.jobService.addJob(job);
    }

    this.refreshJobs();
    this.resetForm();
  }

  editJob(job: JobApplication): void {
    this.editingId = job.id;

    this.jobForm.patchValue({
      company: job.company,
      position: job.position,
      email: job.email,
      status: job.status,
      appliedDate: job.appliedDate
    });

    this.submitted = false;
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }

  deleteJob(id: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'  
    );

    if (!confirmed) {
      return;
    }

    this.jobService.deleteJob(id);
    this.refreshJobs();

    if (this.editingId === id) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.editingId = null;
    this.submitted = false;

    this.jobForm.reset({
      company: '',
      position: '',
      email: '',
      status: 'Applied',
      appliedDate: ''
    });
  }
}