import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from '../tasklist/tasks/tasks.service';
import { Task } from '../tasklist/tasks/task.model';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-kan-ban',
  templateUrl: './kan-ban.component.html',
  styleUrls: ['./kan-ban.component.css']
})
export class KanBanComponent implements OnInit {
  kanBanTasks: Task[];
  kanBanTasksToDo: Task[];
  kanBanTasksDone: Task[];
  color: ThemePalette = 'primary';
  highPriorityColor: ThemePalette = 'warn';
  highPriorityBuffer: number = 50;


  constructor (private tasksService: TasksService){};

  ngOnInit(): void {
      this.kanBanTasks = this.tasksService.showTasks();
      this.tasksService.taskListChanged.subscribe((tasks: Task[]) => {
        this.kanBanTasks=tasks
      });

      this.kanBanTasksDone = this.kanBanTasks.filter((task) => task.status === 'Done');
      this.kanBanTasksToDo = this.kanBanTasks.filter((task) => task.status === 'To-Do');

  }
  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }

  sortStatus(){

  }
}
