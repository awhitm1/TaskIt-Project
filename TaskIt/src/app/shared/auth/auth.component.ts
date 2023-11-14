import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/tasklist/tasks/tasks.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  isLoginMode: boolean = true;
  errMsg: string = null;
  authObsrv: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router, private tasksService: TasksService){}

  setAuthMode(ind: boolean){
    this.isLoginMode = ind;
  }


  onAuthFormSubmit(formObj: NgForm) {
    console.log('Form Values:', formObj.value);
    if (!formObj.valid) return;

    const { email, password} = formObj.value;

    if (this.isLoginMode){
      this.authObsrv = this.authService.signIn(email, password);
    } else {
      this.authObsrv = this.authService.signUp(email, password);
    }

    this.authObsrv.subscribe(
      (res) => {
        console.log('Auth Res Success:', res);
      if (this.errMsg) this.errMsg = null;
      this.tasksService.fetchTasksFromFirebase();
      this.router.navigate(['tasklist']);
    },
    (err) => {
      console.error('Auth Res Error:', err);
      this.errMsg = err.message;
    }
    );

    formObj.reset();
}
}
