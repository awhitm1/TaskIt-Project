import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Task } from "src/app/tasklist/tasks/task.model";


@Injectable({
  providedIn: "root"
})

export class HTTPService {
  firebaseRootUrl = "https://console.firebase.google.com/u/0/project/taskit-55d07/database/taskit-55d07-default-rtdb/data/mytasks.json";


  constructor(
    private http: HttpClient,

  ) {}

  // saveTasksToFirebase(){
  //   const mytasks = this.tasksservice.showTasks();

  //   this.http.put(this.firebaseRootUrl, mytasks).subscribe(res => { console.log("Firebase DB Response: ", res);
  // });
  // }

  // fetchTasksFromFirebase(){
  //   return this.http.get(this.firebaseRootUrl, {}).subscribe((res: Task[] | []) => {
  //     this.tasksservice.updateAllTasks(res);
  //   });
  // }
}
