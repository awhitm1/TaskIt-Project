import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/tasklist/tasks/task.model';
import { TasksService } from 'src/app/tasklist/tasks/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{
  selectedTask = new Task('', new Date(), '','',null);

  constructor(public tasksService: TasksService, public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: Task){}

  ngOnInit(): void {

      this.selectedTask.title=this.data.title;
      this.selectedTask.dueDate=this.data.dueDate;
      this.selectedTask.priority=this.data.priority;
      this.selectedTask.status=this.data.status;
      this.selectedTask.taskID=this.data.taskID;
      this.selectedTask.lastAction=this.data.lastAction;
  }
  onUpdateTask(taskID: number, action: string, formObj?: NgForm){
    if (formObj) {

    this.data.title = formObj.value.title;
    this.data.dueDate = formObj.value.dueDate;
    this.data.priority = formObj.value.priority;
    this.data.status = formObj.value.status;
    this.data.taskID = taskID;
    console.log(this.data)
    this.tasksService.updateTask(this.data, action);
      this.dialogRef.close();
    return
    }

    this.data.taskID = taskID;

    this.tasksService.updateTask(this.data, action);
  }


}
