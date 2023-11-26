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
  firebaseRootUrlTasks = "https://taskit-55d07-default-rtdb.firebaseio.com/";



  myTasks: Task[] = [new Task('Edit or Delete this task', new Date(), 'Low', 'To-Do', 1)];

  constructor(private http: HttpClient, private authsvc: AuthService) {}

  fetchTasksFromFirebase(){
      let localData = JSON.parse(localStorage.getItem('userData'));

      return this.http.get<Task[]>(this.firebaseRootUrlTasks + localData.id +".json", {}).subscribe((res: Task[] | []) => {
        console.log("fetch tasks: ", res)
        this.setTasks(res)
      });
    }


  setTasks(fetched: Task[]){
    if (fetched) {
      console.log("setting tasks: ", fetched)
      this.myTasks = fetched;
    this.taskListChanged.next(this.myTasks.slice());
    } else {
      this.taskListChanged.next(this.myTasks)
    }

  }

  updateTask( task: Task, action: string){
    let localData = JSON.parse(localStorage.getItem('userData'));
    const taskIndex = this.myTasks.findIndex(tasks => tasks.taskID === task.taskID);

    if (taskIndex !== -1){
      if(action === 'edit'){
      this.myTasks[taskIndex] = {
        ...this.myTasks[taskIndex],
        ...task
        }
        this.myTasks[taskIndex].lastAction = 'edited';
        this.http.put(this.firebaseRootUrlTasks + localData.id +".json", this.myTasks).subscribe(res => { console.log("Firebase DB Response (edit): ", res);});

        this.taskItemChanged.next(this.myTasks[taskIndex]);
        this.taskListChanged.next(this.myTasks.slice());
      }

      if (action === 'del'){
        const delItem = this.myTasks[taskIndex];
        delItem.lastAction = 'deleted';
        this.myTasks.splice(taskIndex,1);
        this.http.put(this.firebaseRootUrlTasks + localData.id + ".json", this.myTasks).subscribe(res => { console.log("Firebase DB Response (del): ", res);});
        this.taskItemChanged.next(delItem);
        this.taskListChanged.next(this.myTasks.slice());
      }
      else return;
    }
      if (taskIndex == -1 && action === 'add') {
        console.log("adding...")
        task.lastAction = 'added';
        task.taskID = Math.floor(Math.random()*1000000);

        this.myTasks.push(task);

        this.http.put(this.firebaseRootUrlTasks + localData.id + ".json", this.myTasks).subscribe(res => { console.log("Firebase DB Response (add): ", res);
      });
        this.taskItemChanged.next(this.myTasks[this.myTasks.findIndex(tasks => tasks.taskID === task.taskID)]);
        this.taskListChanged.next(this.myTasks.slice());
    }
      else return;
  }

  getTasks(){
    console.log("getting tasks: ", this.myTasks)
    return this.myTasks.slice();
  }

  updateAllTasks(tasks: Task[]){
    let localData = JSON.parse(localStorage.getItem('userData'));
    this.myTasks = tasks;
    this.http.put(this.firebaseRootUrlTasks + localData.id + ".json", this.myTasks).subscribe(res => { console.log("Firebase DB Response (update): ", res);});
    this.taskListChanged.next(this.myTasks.slice())
  }

  getTaskByID(taskID: number){
    const taskIndex = this.myTasks.findIndex(tasks => tasks.taskID === taskID);
    return this.myTasks[taskIndex]
  }
}
