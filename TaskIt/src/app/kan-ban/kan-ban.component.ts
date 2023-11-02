import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from '../tasklist/tasks/tasks.service';
import { Task } from '../tasklist/tasks/task.model';
import {ThemePalette} from '@angular/material/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

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
  selectedTask: Task = {title: '', dueDate: null ,priority: '',status: '',taskID: null};
  selectedList: Task [];
  sortByPriority: string [] = ['High','Medium','Low'];
  taskDetail: Task = {taskID: null, title: '', dueDate: null, priority: '', status: ''};



  constructor (private tasksService: TasksService){};

  ngOnInit(): void {
      this.kanBanTasks = this.tasksService.showTasks();
      this.sub = this.tasksService.taskListChanged.subscribe((tasks: Task[]) => {
        this.kanBanTasks=tasks;
        console.log("OnInit: ", this.kanBanTasks)
      });

      this.refreshList();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  refreshList(){
      this.kanBanTasksDone = this.kanBanTasks.filter((task) => task.status === 'Done');
      this.kanBanTasksDone.sort((a,b) => this.sortByPriority.indexOf(a.priority) - this.sortByPriority.indexOf(b.priority));
      this.kanBanTasksInProgress = this.kanBanTasks.filter((task) => task.status === 'In Progress');
      this.kanBanTasksInProgress.sort((a,b) => this.sortByPriority.indexOf(a.priority) - this.sortByPriority.indexOf(b.priority));
      this.kanBanTasksToDo = this.kanBanTasks.filter((task) => task.status === 'To-Do');
      this.kanBanTasksToDo.sort((a,b) => this.sortByPriority.indexOf(a.priority) - this.sortByPriority.indexOf(b.priority));
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
      this.refreshList();
      this.tasksService.updateAllTasks(this.kanBanEditedTasks);


  }
  onUpdateTask(taskID: number, action: string, formObj?: NgForm){
    if (formObj) {
      console.log(formObj);
    this.taskDetail.title = formObj.value.title;
    this.taskDetail.dueDate = formObj.value.dueDate;
    this.taskDetail.priority = formObj.value.priority;
    this.taskDetail.status = formObj.value.status;
    this.taskDetail.taskID = taskID;
    this.tasksService.updateTask(this.taskDetail, action);
    this.refreshList();
    return
    }

    this.taskDetail.taskID = taskID;
    this.tasksService.updateTask(this.taskDetail, action);
    this.refreshList();

  }

  //   onUpdateTask(task: Task, action: string){
  //   console.log(task);
  //   this.tasksService.updateTask(task, action);

  //   this.refreshList();
  // }

  delTaskToDo(idx: number){
    this.kanBanTasksToDo.splice(idx,1);
    this.kanBanEditedTasks = this.kanBanTasksDone.concat(this.kanBanTasksInProgress, this.kanBanTasksToDo);
      this.tasksService.updateAllTasks(this.kanBanEditedTasks);
  }
  delTaskInProgress(idx: number){
    this.kanBanTasksInProgress.splice(idx,1);
    this.kanBanEditedTasks = this.kanBanTasksDone.concat(this.kanBanTasksInProgress, this.kanBanTasksToDo);
      this.tasksService.updateAllTasks(this.kanBanEditedTasks);
  }
  delTaskDone(idx: number){
    this.kanBanTasksDone.splice(idx,1);
    this.kanBanEditedTasks = this.kanBanTasksDone.concat(this.kanBanTasksInProgress, this.kanBanTasksToDo);
      this.tasksService.updateAllTasks(this.kanBanEditedTasks);
  }

  onTaskSelectToDo(index: number){
    console.log("OnSelect: ", index);
    console.log(this.selectedTask);
      this.selectedTask=this.kanBanTasksToDo[index];
      console.log(this.selectedTask)
  }
  onTaskSelectInProgress(index: number){
      this.selectedTask=this.kanBanTasksInProgress[index];
  }
  onTaskSelectedDone(index: number){
      this.selectedTask=this.kanBanTasksDone[index];

  }



}
