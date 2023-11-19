import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Task } from "src/app/tasklist/tasks/task.model";


@Injectable({
  providedIn: "root"
})

export class HTTPService {
  firebaseRootUrl = "https://console.firebase.google.com/u/0/project/taskit-55d07/database/taskit-55d07-default-rtdb/data/";

  constructor(private http: HttpClient) {}
}
