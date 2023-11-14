import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy{
  selectedButton: string;
  taskListSelected: boolean = true;
  // onLanding: boolean = true;
  isAuthenticated: boolean = false;

  constructor(private authsvc: AuthService){}

  ngOnInit(): void {
      this.authsvc.currentUser.subscribe((user) => {
        this.isAuthenticated = !!user;
      })
  }

  ngOnDestroy(): void {
    this.authsvc.currentUser.unsubscribe();
  }

  onSelect(display: string){

    this.selectedButton = display;
    // this.onLanding = false;
    if (this.selectedButton === 'task-list'){
      this.taskListSelected = true;
    } else {
      this.taskListSelected = false;
    }
  }

  // setLanding(){
  //   this.onLanding = true;
  // }

}
