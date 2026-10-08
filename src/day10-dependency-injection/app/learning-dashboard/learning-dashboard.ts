import { Component } from '@angular/core';
import { LearningService } from '../services/learning.service';

@Component({
  selector: 'app-learning-dashboard',
  imports: [],
  templateUrl: './learning-dashboard.html',
  styleUrl: './learning-dashboard.css'
})
export class LearningDashboard {

  topics;

  constructor(private learningService: LearningService) {
    this.topics = this.learningService.getTopics();
  }

  toggleTopic(id: number) {
    this.learningService.toggleCompleted(id);
  }

  get completedCount() {
    return this.learningService.getCompletedCount();
  }
}