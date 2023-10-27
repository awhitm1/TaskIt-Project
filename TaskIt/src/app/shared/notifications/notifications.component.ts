import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/tasklist/tasks/task.model';
import { TasksService } from 'src/app/tasklist/tasks/tasks.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private taskItemChangeSub: Subscription;

  constructor(private tasksService: TasksService, private _snackBar: MatSnackBar){

  }

  ngOnInit(): void {

    this.taskItemChangeSub = this.tasksService.taskItemChanged.subscribe(data=>{

      this._snackBar.open(`Task ID ${data.taskID} has been changed to: ${data.title} at ${data.dueDate} with ${data.priority} Priority with Status: ${data.status}`, "OK", {duration: 3000, horizontalPosition: 'center', verticalPosition: 'top'})

    })
  }

  ngOnDestroy(){
    this.taskItemChangeSub.unsubscribe();
  }


}
