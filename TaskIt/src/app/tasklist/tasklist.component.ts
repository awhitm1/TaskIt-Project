import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  newTask = new Task('New Task Title', '', 'Medium', 'To-Do');

  constructor(private tasksService: TasksService ){}

  ngOnInit(): void {
      this.tasks = this.tasksService.showTasks();
      this.tasksService.taskListChanged.subscribe((tasks: Task[]) => {
        this.tasks=tasks
      })
    }

    addNewTask(task: Task){
      this.tasksService.addNewTask(task);
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
