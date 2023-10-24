import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})


export class TasksService {

  taskListChanged = new Subject<Task[]>();


  private myTasks: Task[] = [
    new Task ('Wake Up again', new Date('2023-10-23T15:00:00') , 'High','To-Do'),
    new Task ('Go to Work again', new Date('2023-10-23T14:00:00'), 'Low','To-Do'),
    new Task ('Get Groceries again', new Date('2023-10-23T13:00:00'), 'Medium','In Progress'),
    new Task ('Walk Dog again', new Date('2023-10-23T12:00:00'), 'High','Done'),
    new Task ('Feed Cat', new Date('2023-10-23T11:00:00'), 'High','To-Do'),
    new Task ('Clean House', new Date('2023-10-23T08:00:00'), 'High','Done'),
    new Task ('Do Laundry', new Date('2023-10-23T09:00:00'), 'High','In Progress')
  ];

  constructor() { }

  addNewTask(task: Task){
    this.myTasks.push(task);
    this.taskListChanged.next(this.myTasks.slice())
  }

  showTasks(){
    return this.myTasks.slice();
  }

  updateTask( task: Task, index?: number){
    this.myTasks[index] = task;
    this.taskListChanged.next(this.myTasks.slice())

  }
  delTask(idx: number){
    this.myTasks.splice(idx,1)
    this.taskListChanged.next(this.myTasks.slice());
    const task: Task = this.myTasks[idx]

  }

  updateAllTasks(tasks: Task[]){
    this.myTasks = tasks;
    this.taskListChanged.next(this.myTasks.slice())

  }


}
