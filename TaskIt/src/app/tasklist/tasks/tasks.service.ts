import { Injectable, EventEmitter, Output } from '@angular/core';
import { Task } from './task.model';




@Injectable({
  providedIn: 'root'
})


export class TasksService {
  private myTasks: Task[] = [
    new Task ('Wake Up again', '6am', 'High','To-Do'),
    new Task ('Go to Work again', '8am', 'High','To-Do'),
    new Task ('Get Groceries again', '5pm', 'Medium','To-Do'),
    new Task ('Walk Dog again', '5:30pm', 'High','To-Do'),
  ];

  @Output() taskSelected = new EventEmitter<Task>();

  constructor() { }

  addNewTask(task: Task){
    this.myTasks.push(task);
  }

  showTasks(){
    return this.myTasks.slice();
  }

  updateTask(index: number, task: Task){
    console.log(this.myTasks[index]);
    console.log(task);
    this.myTasks[index] = task;
    console.log(this.myTasks)
  }
  delTask(idx: number){
    this.myTasks.splice(idx,1)
  }
}
