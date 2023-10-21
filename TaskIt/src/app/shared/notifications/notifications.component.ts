import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/tasklist/tasks/tasks.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private taskChangeSub: Subscription;

  constructor(private tasksService: TasksService){

  }

  ngOnInit(): void {
    this.taskChangeSub = this.tasksService.taskListChanged.subscribe(data=>{
      console.log(data);
      alert(`task: {data.title}\n changed!`)
    })
  }

  ngOnDestroy(){
    this.taskChangeSub.unsubscribe();
  }
}
