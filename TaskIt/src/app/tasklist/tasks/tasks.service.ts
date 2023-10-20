import { Injectable, EventEmitter } from '@angular/core';
import { Task } from './task.model';




@Injectable({
  providedIn: 'root'
})


export class TasksService {
  taskListChanged = new EventEmitter<Task[]>();

  private myTasks: Task[] = [
    new Task ('Wake Up again', '6am', 'High','To-Do'),
    new Task ('Go to Work again', '8am', 'High','To-Do'),
    new Task ('Get Groceries again', '5pm', 'Medium','In Progress'),
    new Task ('Walk Dog again', '5:30pm', 'High','Done'),
  ];

  constructor() { }

  addNewTask(task: Task){
    this.myTasks.push(task);
    this.taskListChanged.emit(this.myTasks.slice())
  }

  showTasks(){
    return this.myTasks.slice();
  }

  updateTask(index: number, task: Task){
    this.myTasks[index] = task;
    this.taskListChanged.emit(this.myTasks.slice())
  }
  delTask(idx: number){
    this.myTasks.splice(idx,1)
    this.taskListChanged.emit(this.myTasks.slice())
  }
}
