import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from '../tasklist/tasks/tasks.service';
import { Task } from '../tasklist/tasks/task.model';
import {ThemePalette} from '@angular/material/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kan-ban',
  templateUrl: './kan-ban.component.html',
  styleUrls: ['./kan-ban.component.css'],

})
export class KanBanComponent implements OnInit, OnDestroy {
  kanBanTasks: Task[];
  kanBanTasksToDo: Task[];
  kanBanTasksInProgress: Task[];
  kanBanTasksDone: Task[];
  kanBanEditedTasks: Task[];
  sub: Subscription;



  constructor (private tasksService: TasksService){};

  ngOnInit(): void {
      this.kanBanTasks = this.tasksService.showTasks();
      this.sub = this.tasksService.taskListChanged.subscribe((tasks: Task[]) => {
        this.kanBanTasks=tasks
      });

      this.refreshList();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  refreshList(){
    this.kanBanTasksDone = this.kanBanTasks.filter((task) => task.status === 'Done');
      this.kanBanTasksInProgress = this.kanBanTasks.filter((task) => task.status === 'In Progress');
      this.kanBanTasksToDo = this.kanBanTasks.filter((task) => task.status === 'To-Do');
  }

  drop(event: CdkDragDrop<Task[]>, listStatus: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

          event.container.data[event.currentIndex].status=listStatus
      }

      this.kanBanEditedTasks = this.kanBanTasksDone.concat(this.kanBanTasksInProgress, this.kanBanTasksToDo);
      this.tasksService.updateAllTasks(this.kanBanEditedTasks);


  }

  onUpdateTask(task: Task){
    this.tasksService.updateTask(task);
    this.refreshList();
  }
}
