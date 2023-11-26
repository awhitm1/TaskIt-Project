import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/tasklist/tasks/tasks.service';
import { ProfileService } from '../profile/profile.service';
import { User } from './user.model';
import { Profile } from '../profile/profile.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit{
  isLoginMode: boolean;
  errMsg: string = null;
  authObsrv: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router, private tasksService: TasksService, private profilesvc: ProfileService){}

  ngOnInit(): void {
      this.isLoginMode = this.authService.isLogInMode;
  }


  onAuthFormSubmit(formObj: NgForm) {
    console.log('Form Values:', formObj.value);
    if (!formObj.valid) return;

    const { email, password, firstName, lastName, imgPath } = formObj.value;

    if (this.isLoginMode){
      this.authObsrv = this.authService.signIn(email, password);
    } else {

      this.authObsrv = this.authService.signUp(email, password, firstName, lastName, imgPath);
    }

    this.authObsrv.subscribe(
      (res) => {
        console.log('Auth Comp Res Success:', res);
      if (this.errMsg) this.errMsg = null;
      this.tasksService.fetchTasksFromFirebase();
      this.profilesvc.fetchProfiles();
      if (!!firstName){

        const newProfile = new Profile(res.localId, firstName, lastName, email, imgPath)

        this.authService.setIsLogInMode(true);
        this.isLoginMode = true;
        this.router.navigate(['auth']);
      }else {
        this.router.navigate(['tasklist']);
      }

    },
    (err) => {
      console.error('Auth Comp Res Error:', err);
      this.errMsg = err.message;
    }
    );

    formObj.reset();
}
}
