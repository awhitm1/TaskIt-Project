import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  selectedButton: string;
  taskListSelected: boolean = true;


  constructor(private authsvc: AuthService){}





  onSelect(display: string){
    this.selectedButton = display;
    // this.onLanding = false;
    if (this.selectedButton === 'task-list'){
      this.taskListSelected = true;
    } else {
      this.taskListSelected = false;
    }
  }
}
