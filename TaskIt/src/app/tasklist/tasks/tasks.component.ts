import { Component } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  myTasks: Task[] = [
    new Task ('Wake Up', '6am', 'High','To-Do'),
    new Task ('Go to Work', '8am', 'High','To-Do'),
    new Task ('Get Groceries', '5pm', 'Medium','To-Do'),
    new Task ('Walk Dog', '5:30pm', 'High','To-Do'),
  ]
}
