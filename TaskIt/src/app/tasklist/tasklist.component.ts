import { Component } from '@angular/core';
import { Task } from './tasks/task.model';
import { TasksComponent } from './tasks/tasks.component';
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {
  altTasks: Task[] = [
    new Task ('Wake Up again', '6am', 'High','To-Do'),
    new Task ('Go to Work again', '8am', 'High','To-Do'),
    new Task ('Get Groceries again', '5pm', 'Medium','To-Do'),
    new Task ('Walk Dog again', '5:30pm', 'High','To-Do'),
  ]
}
