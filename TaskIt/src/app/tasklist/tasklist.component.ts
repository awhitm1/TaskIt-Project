import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { TasksService } from './tasks/tasks.service';
import { Task } from './tasks/task.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],

})
export class TasklistComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['taskID', 'title', 'dueDate', 'status', 'priority', 'Actions'];
  selectedTask = {};
  selectedTaskIdx: number;
  tasks: Task[];
  dataSource: MatTableDataSource<Task>;
  newTask = new Task('New Task Title', new Date(), 'Medium', 'To-Do', null);
  taskDetail: Task = {taskID: null, title: '', dueDate: null, priority: '', status: ''}


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tasksService: TasksService) {


  }
  ngOnInit(): void {
    this.tasks = this.tasksService.showTasks();
    this.dataSource = new MatTableDataSource(this.tasks); // maybe needs to be in constructor
    this.tasksService.taskListChanged.subscribe((tasks: Task[]) => {
        this.tasks=tasks;
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       })
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

  addNewTask(task: Task){

    this.tasksService.addNewTask(task);

  }

  onTaskSelect(index: number, pageIndex: number, pageSize: number){

    this.selectedTaskIdx = index + (pageIndex*pageSize);
    this.selectedTask = this.dataSource.sortData(this.dataSource.data, this.dataSource.sort)[this.selectedTaskIdx];


  }

  editTask(task: Task){

    this.tasksService.updateAllTasks(this.dataSource.sortData(this.dataSource.data, this.dataSource.sort));
  }

  delTask(index: number, pageIndex: number, pageSize: number){

    this.selectedTaskIdx = index + (pageIndex*pageSize);
    this.selectedTask = this.dataSource.sortData(this.dataSource.data, this.dataSource.sort)[this.selectedTaskIdx];
    this.dataSource.sortData(this.dataSource.data, this.dataSource.sort).splice(this.selectedTaskIdx,1);
    this.tasksService.updateAllTasks(this.dataSource.sortData(this.dataSource.data, this.dataSource.sort));
  }

  onSubmitTask(formObj: NgForm, taskID: number, action: string){

    this.taskDetail.title = formObj.value.title;
    this.taskDetail.dueDate = formObj.value.dueDate;
    this.taskDetail.priority = formObj.value.priority;
    this.taskDetail.status = formObj.value.status;
    this.taskDetail.taskID = taskID;

    this.tasksService.updateTask(this.taskDetail, action)
  }

}


