import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})


export class TasksService {
  // taskListChanged = new EventEmitter<Task[]>();
  taskListChanged = new Subject<Task[]>();

  private myTasks: Task[] = [
    new Task ('Wake Up again', '6am', 'High','To-Do'),
    new Task ('Go to Work again', '8am', 'Low','To-Do'),
    new Task ('Get Groceries again', '5pm', 'Medium','In Progress'),
    new Task ('Walk Dog again', '5:30pm', 'High','Done'),
    new Task ('Feed Cat', '5:45pm', 'High','To-Do'),
    new Task ('Clean House', '12pm', 'High','Done'),
    new Task ('Do Laundry', '4pm', 'High','In Progress'),
  ];

  constructor() { }

  addNewTask(task: Task){
    this.myTasks.push(task);
    this.taskListChanged.next(this.myTasks.slice())
  }

  showTasks(){
    return this.myTasks.slice();
  }

  updateTask(index: number, task: Task){
    this.myTasks[index] = task;
    this.taskListChanged.next(this.myTasks.slice())
  }
  delTask(idx: number){
    this.myTasks.splice(idx,1)
    this.taskListChanged.next(this.myTasks.slice())
  }

  updateAllTasks(tasks: Task[]){
    this.myTasks = tasks;
    this.taskListChanged.next(this.myTasks.slice())
  }
}
