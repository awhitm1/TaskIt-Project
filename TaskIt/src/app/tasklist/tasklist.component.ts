import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';

import { TasksService } from './tasks/tasks.service';
import { Task } from './tasks/task.model';
import { NgForm } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { EditTaskComponent } from '../shared/edit-task/edit-task.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],

})
export class TasklistComponent implements OnInit, AfterViewInit, OnDestroy {


  displayedColumns: string[] = ['taskID', 'title', 'dueDate', 'status', 'priority', 'Actions'];
  selectedTask: Task = {title: '', dueDate: null, status: '', priority:'', taskID: null, lastAction: ''};
  selectedTaskIdx: number;
  tasks: Task[];
  sub: Subscription;
  dataSource: MatTableDataSource<Task>;
  newTask = new Task('New Task Title', new Date(), 'Medium', 'To-Do', null);
  taskDetail: Task = {taskID: null, title: '', dueDate: null, priority: '', status: ''}


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tasksService: TasksService, public dialog: Dialog) {};

  ngOnInit(): void {
    this.tasksService.fetchTasksFromFirebase();
    this.sub = this.tasksService.taskListChanged.subscribe((tasks: Task[]) => {
      this.tasks=tasks;
      this.dataSource = new MatTableDataSource(this.tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     })
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onModal(taskID?: number){

    if (taskID){
      this.selectedTask = this.tasksService.getTaskByID(taskID);
      this.selectedTask.lastAction = 'edit';
      const dialogRef = this.dialog.open<string>(EditTaskComponent, {ariaModal: true, hasBackdrop: true, disableClose: false, backdropClass: 'dialogBackdrop', data: this.selectedTask});
    }

    else {
      this.selectedTask = new Task('New Task Title', new Date(), 'Medium', 'To-Do', null, 'add');
      const dialogRef = this.dialog.open<string>(EditTaskComponent, {ariaModal: true, hasBackdrop: true, disableClose: false, backdropClass: 'dialogBackdrop', data:  this.selectedTask});
    }
  }

  delTask(taskId: number){
    this.selectedTask = this.tasksService.getTaskByID(taskId);
    this.tasksService.updateTask(this.selectedTask, 'del');
  }
}


