import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/tasklist/tasks/tasks.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private taskChangeSub: Subscription;

  constructor(private tasksService: TasksService, private _snackBar: MatSnackBar){

  }

  ngOnInit(): void {
    this.taskChangeSub = this.tasksService.taskListChanged.subscribe(data=>{
      console.log(data);
      this._snackBar.open("Task Updated", "OK", {duration: 3000, horizontalPosition: 'center', verticalPosition: 'top'})
      // alert(`Your Task has been updated!`)
    })
  }

  ngOnDestroy(){
    this.taskChangeSub.unsubscribe();
  }
}
