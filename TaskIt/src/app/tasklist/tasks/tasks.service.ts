import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})


export class TasksService {

  taskListChanged = new Subject<Task[]>();
  taskItemChanged = new Subject<Task>();



  private myTasks: Task[] = [
    new Task ('Wake Up again', new Date('2023-10-23T15:00:00') , 'High','To-Do', 1000),
    new Task ('Go to Work again', new Date('2023-10-23T14:00:00'), 'Low','To-Do',1001),
    new Task ('Get Groceries again', new Date('2023-10-23T13:00:00'), 'Medium','In Progress',1002),
    new Task ('Walk Dog again', new Date('2023-10-23T12:00:00'), 'High','Done',1003),
    new Task ('Feed Cat', new Date('2023-10-23T11:00:00'), 'High','To-Do',1004),
    new Task ('Clean House', new Date('2023-10-23T08:00:00'), 'High','Done',1005),
    new Task ('Do Laundry', new Date('2023-10-23T09:00:00'), 'High','In Progress', 1006)
  ];

  constructor() { }

  addNewTask(task: Task){
    this.myTasks.push(task);
    this.taskListChanged.next(this.myTasks.slice())
  }

  showTasks(){
    return this.myTasks.slice();
  }

  updateTask( task: Task, action: string){

    const taskIndex = this.myTasks.findIndex(tasks => tasks.taskID === task.taskID);

    if (taskIndex !== -1){
      if(action === 'edit'){
      this.myTasks[taskIndex] = {
        ...this.myTasks[taskIndex],
        ...task

        }
        this.myTasks[taskIndex].lastAction = 'edited';
        this.taskItemChanged.next(this.myTasks[taskIndex]);
        this.taskListChanged.next(this.myTasks.slice());
      }

      if (action === 'del'){
        const delItem = this.myTasks[taskIndex];
        delItem.lastAction = 'deleted';
        this.myTasks.splice(taskIndex,1);
        this.taskItemChanged.next(delItem);
        this.taskListChanged.next(this.myTasks.slice());
      }
      else return;
    }
      if (taskIndex == -1 && action === 'add') {
        task.lastAction = 'added';
        task.taskID = Math.floor(Math.random()*1000000);

        this.myTasks.push(task);
        this.taskItemChanged.next(this.myTasks[this.myTasks.findIndex(tasks => tasks.taskID === task.taskID)]);
        this.taskListChanged.next(this.myTasks.slice());
    }
      else return;
  }


  updateAllTasks(tasks: Task[]){
    this.myTasks = tasks;
    this.taskListChanged.next(this.myTasks.slice())

  }

  getTaskByID(taskID: number){
    const taskIndex = this.myTasks.findIndex(tasks => tasks.taskID === taskID);
    return this.myTasks[taskIndex]
  }
}
