import { Component, inject } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-summary',
  standalone: true,
  template: `
    <section class="summary" aria-label="Task counts">
      <div>
        <strong>{{ taskService.totalCount() }}</strong>
        <span>Total</span>
      </div>

      <div>
        <strong>{{ taskService.totalCount() }}</strong>
        <span>Total</span>
      </div>

      <div>
        <strong>{{ taskService.completedCount() }}</strong>
        <span>Pending</span>
       </div>
    </section>
  `,
  styles: `
    .summary {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin: 24px 0;
    }

    .summary div {
        padding: 18px 8px;
        border: 1px solid #dbe3ef;
        border-radius: 10px;
        background: #eff6ff;
        text-align: center;
    }

    strong {
      display: block;
      color: #1d4ed8;
      font-size: 28px;
    }
  
    span {
      display: block;
      margin-top: 6px;
      color: #475569;
      font-size: 13px;
    }
   `
})
export class TaskSummary {
  readonly taskService = inject(TaskService);
}