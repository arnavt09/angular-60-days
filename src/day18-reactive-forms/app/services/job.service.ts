import { Injectable } from "@angular/core";
import { JobApplication } from "../models/job-application";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobs: JobApplication[] = this.loadJobs();

  private loadJobs(): JobApplication[] {
    try {
      const stored = localStorage.getItem(this.storageKey);

      return Array.isArray(parsed)
        ? parsed as JobApplication[]
        : [];
    } catch {
      return [];
    }
  }

  private saveJobs(): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.jobs)
      );
    } catch (error) {
      console.error('Could not save jobs:', error);
    }
  }

  getJobs(): JobApplication[] {
    return [...this.jobs];
  }

  addJob(job: JobApplication): void {
    this.jobs.push(job);
    this.saveJobs();
  }

  updateJob(updatedJob: JobApplication): void {
    this.jobs = this.jobs.map(job =>
      job.id === updatedJob.id ? updatedJob : job
    );

    this.saveJobs();
  }

  deleteJob(id: number): void {
    this.jobs = this.jobs.filter(job => job.id !== id);
    this.saveJobs();
  }
}