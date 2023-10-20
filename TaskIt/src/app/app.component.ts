import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // loadedDisplay = 'task-list';




  constructor(private router: Router){

  }

  ngOnInit(): void {
      this.router.navigate
  }



  onChangeDisplay (display: string){

    // this.loadedDisplay = display;
  }
}
