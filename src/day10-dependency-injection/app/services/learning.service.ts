import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  private topics = [
    {
      id: 1,
      name: 'Angular Components',
      completed: true  
    },
    {
      id: 2,
      name: 'Data Binding',
      completed: true  
    },
    {
      id: 3,
      name: 'Angular Services',
      completed: true
    },
    {
      id: 4,
      name: 'Dependency Injection',
      completed: false
    }
  ];

  getTopics() {
    return this.topics;
  }

  toggleCompleted(id: number) {
    const topic = this.topics.find(
      topic => topic.id === id
    );

    if (topic) {
      topic.completed = !topic.completed;  
    }
  }

  getCompletedCount() {
    return this.topics.filter(
      topic => topic.completed
    ).length;
  }
}