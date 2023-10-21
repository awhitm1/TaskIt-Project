import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  selectedButton: string;
  taskListSelected: boolean = true;
  onLanding: boolean = true;

  onSelect(display: string){

    this.selectedButton = display;
    this.onLanding = false;
    if (this.selectedButton === 'task-list'){
      this.taskListSelected = true;
    } else {
      this.taskListSelected = false;
    }
  }

  setLanding(){
    this.onLanding = true;
  }

}
