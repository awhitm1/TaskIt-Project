import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TasksService } from './tasks/tasks.service';
import { Task } from './tasks/task.model';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],

})
export class TasklistComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'dueDate', 'status', 'priority', 'Actions'];
  selectedTask = {};
  editedTaskIdx: number;
  tasks: Task[];
  dataSource: MatTableDataSource<Task>;
  newTask = new Task('New Task Title', '', 'Medium', 'To-Do');

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

  onTaskEdit(idx: number){
    this.editedTaskIdx = idx;
    this.selectedTask = this.tasks[idx]
  }

  editTask(task: Task){
    this.tasksService.updateTask(this.editedTaskIdx, task);
  }

  delTask(idx: number){
    this.tasksService.delTask(idx);
  }
}


// import { Component, OnInit } from '@angular/core';
// import { Task } from './tasks/task.model';
// import { TasksService } from './tasks/tasks.service';

// @Component({
//   selector: 'app-tasklist',
//   templateUrl: './tasklist.component.html',
//   styleUrls: ['./tasklist.component.css']
// })
// export class TasklistComponent implements OnInit {
//   selectedTask = {};
//   tasks: Task[];
//   editedTaskIdx: number;

//   newTask = new Task('New Task Title', '', 'Medium', 'To-Do');

//   constructor(private tasksService: TasksService ){}

//   ngOnInit(): void {
//       this.tasks = this.tasksService.showTasks();
//       this.tasksService.taskListChanged.subscribe((tasks: Task[]) => {
//         this.tasks=tasks
//       })
//     }

//     addNewTask(task: Task){
//       this.tasksService.addNewTask(task);
//     }

//     onTaskEdit(idx: number){
//       this.editedTaskIdx = idx;
//       this.selectedTask = this.tasks[idx]
//   }

//     editTask(task: Task){
//       this.tasksService.updateTask(this.editedTaskIdx, task);
//   }

//     delTask(idx: number){
//       this.tasksService.delTask(idx);
//     }



// }
