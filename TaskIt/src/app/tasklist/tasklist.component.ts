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
  editedTaskIdx: number;

  newTask = new Task('New Task Title', '8am', 'Medium', 'To-Do');



  constructor(private tasksService: TasksService ){}

  ngOnInit(): void {
      this.tasks = this.tasksService.showTasks();
      this.tasksService.taskListChanged.subscribe((tasks: Task[]) => {
        this.tasks=tasks
      })
    }


    onTaskEdit(idx: number){
      this.editedTaskIdx = idx;
      this.selectedTask = this.tasks[idx]

  }

    editTask(task: Task){

      this.tasksService.updateTask(this.editedTaskIdx, task);
  }

    delTask(idx: number){
      this.tasksService.delTask(idx);
    }

}
