import { Component, Input, OnInit } from '@angular/core';
import { Task } from './tasks/task.model';
import { TasksService } from './tasks/tasks.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  selectedTask = {};
  tasks: Task[];

  newTask = new Task('New Task Title', '8am', 'Medium', 'To-Do');



  constructor(private tasksService: TasksService ){}

  ngOnInit(): void {
      this.tasks = this.tasksService.showTasks();

    }


    onTaskEdit(idx){
      this.selectedTask = this.tasks[idx]

    console.log(this.selectedTask);
  }

  editTask(index: number){
      console.log(index);
      this.tasksService.updateTask(index);
  }

}
