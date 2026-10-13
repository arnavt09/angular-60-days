import { Component } from "@angular/core";
import { TaskList } from "./task-list";
import { TaskSummary } from "./task-summary";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskList, TaskSummary],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}