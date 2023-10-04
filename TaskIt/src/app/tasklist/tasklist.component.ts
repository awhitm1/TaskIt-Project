import { Component } from '@angular/core';
import { Task } from './tasks/task.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {
  myTasks: Task[] = [
    new Task ('Wake Up', '6am', 'High','To-Do'),
    new Task ('Go to Work', '8am', 'High','To-Do'),
    new Task ('Get Groceries', '5pm', 'Medium','To-Do'),
    new Task ('Walk Dog', '5:30pm', 'High','To-Do'),
  ]
}
