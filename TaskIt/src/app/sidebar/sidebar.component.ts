import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() displaySelected = new EventEmitter<string>();
  selectedButton: string;
  taskListSelected: boolean = true;


  onSelect(display: string){
    this.displaySelected.emit(display);
    this.selectedButton = display;

    if (this.selectedButton === 'task-list'){
      this.taskListSelected = true;
    } else {
      this.taskListSelected = false;
    }
  }

}
