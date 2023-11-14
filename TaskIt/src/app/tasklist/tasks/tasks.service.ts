import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject, exhaustMap, take, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth/auth.service';





@Injectable({
  providedIn: 'root'
})


export class TasksService {

  taskListChanged = new Subject<Task[]>();
  taskItemChanged = new Subject<Task>();

  firebaseRootUrl = "https://taskit-55d07-default-rtdb.firebaseio.com/mytasks.json";

  private myTasks: Task[] = [new Task ('', null, '', '', null)];

  // private myTasks: Task[] = [
  //   new Task ('Wake Up again', new Date('2023-10-23T15:00:00') , 'High','To-Do', 1000),
  //   new Task ('Go to Work again', new Date('2023-10-23T14:00:00'), 'Low','To-Do',1001),
  //   new Task ('Get Groceries again', new Date('2023-10-23T13:00:00'), 'Medium','In Progress',1002),
  //   new Task ('Walk Dog again', new Date('2023-10-23T12:00:00'), 'High','Done',1003),
  //   new Task ('Feed Cat', new Date('2023-10-23T11:00:00'), 'High','To-Do',1004),
  //   new Task ('Clean House', new Date('2023-10-23T08:00:00'), 'High','Done',1005),
  //   new Task ('Do Laundry', new Date('2023-10-23T09:00:00'), 'High','In Progress', 1006)
  // ];

  constructor(private http: HttpClient, private authsvc: AuthService) {}

  fetchTasksFromFirebase(){
    console.log("Calling fetchTasksFromFirebase!");
    return this.http.get<Task[]>(this.firebaseRootUrl, {}).subscribe((res: Task[] | []) => {
      this.setTasks(res)
    });

    // return this.http.get<Task[]>(this.firebaseRootUrl, {}).pipe(
    //   tap(tasks => {
    //     console.log("calling setTasks");
    //     this.setTasks(tasks);
    //   })
    // );


  }

  // showTasks(){
  //   this.http.get(this.firebaseRootUrl, {}).subscribe((res: Task[] | []) => {this.setTasks(res)});
  //   this.taskListChanged.next(this.myTasks.slice());

  //   return this.myTasks.slice();
  // }

  setTasks(fetched: Task[]){
    this.myTasks = fetched;
    console.log("setTasks called");

    this.taskListChanged.next(this.myTasks.slice());
    console.log("set Tasks:", this.myTasks)
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
        this.http.put(this.firebaseRootUrl, this.myTasks).subscribe(res => { console.log("Firebase DB Response: ", res);});
        this.taskItemChanged.next(this.myTasks[taskIndex]);
        this.taskListChanged.next(this.myTasks.slice());
      }

      if (action === 'del'){
        const delItem = this.myTasks[taskIndex];
        delItem.lastAction = 'deleted';
        this.myTasks.splice(taskIndex,1);
        this.http.put(this.firebaseRootUrl, this.myTasks).subscribe(res => { console.log("Firebase DB Response: ", res);});
        this.taskItemChanged.next(delItem);
        this.taskListChanged.next(this.myTasks.slice());
      }
      else return;
    }
      if (taskIndex == -1 && action === 'add') {
        task.lastAction = 'added';
        task.taskID = Math.floor(Math.random()*1000000);

        this.myTasks.push(task);
        this.http.put(this.firebaseRootUrl, this.myTasks).subscribe(res => { console.log("Firebase DB Response: ", res);
      });
        this.taskItemChanged.next(this.myTasks[this.myTasks.findIndex(tasks => tasks.taskID === task.taskID)]);
        this.taskListChanged.next(this.myTasks.slice());
    }
      else return;
  }

  getTasks(){
    return this.myTasks;
  }

  updateAllTasks(tasks: Task[]){
    this.myTasks = tasks;
    this.http.put(this.firebaseRootUrl, this.myTasks).subscribe(res => { console.log("Firebase DB Response: ", res);});
    this.taskListChanged.next(this.myTasks.slice())

  }

  getTaskByID(taskID: number){
    const taskIndex = this.myTasks.findIndex(tasks => tasks.taskID === taskID);
    return this.myTasks[taskIndex]
  }
}
