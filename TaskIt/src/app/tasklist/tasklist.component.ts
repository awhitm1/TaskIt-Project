import { Component, Input, OnInit } from '@angular/core';
import { Task } from './tasks/task.model';
import { TasksService } from './tasks/tasks.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @Input() taskEl: Task;
  tasks: Task[];
  selectedTask: Task;
  newTask = new Task('New Task Title', '8am', 'Medium', 'To-Do');

  constructor(private tasksService: TasksService ){}

  ngOnInit(): void {
      this.tasks = this.tasksService.showTasks();
      this.tasksService.taskSelected.subscribe((taskEl: Task) => this.selectedTask = taskEl);
      console.log(this.tasks)
      ;
  }

}
