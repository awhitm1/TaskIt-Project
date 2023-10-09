import { Component } from '@angular/core';
import { Task } from './tasks/task.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {
  myTasks: Task[] = [
    new Task ('Wake Up again', '6am', 'High','To-Do'),
    new Task ('Go to Work again', '8am', 'High','To-Do'),
    new Task ('Get Groceries again', '5pm', 'Medium','To-Do'),
    new Task ('Walk Dog again', '5:30pm', 'High','To-Do'),
  ]

  newTask = new Task('New Task Title', '8am', 'Medium', 'To-Do');

  addNewTask(){
    this.myTasks.push(this.newTask)
  }

  editTask(){

  }

  delTask(taskIndex: number){
    console.log(taskIndex)
    // this.myTasks.splice(taskIndex,1)
  }
}
