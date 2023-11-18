import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './shared/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from './shared/auth/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUserSub: Subscription;
  authUser: User;

  constructor(private router: Router, private authsvc: AuthService){}

  ngOnInit(): void {
      this.router.navigate(['']);
      this.currentUserSub = this.authsvc.currentUser.subscribe(data => {
        console.log("current user: ", data);
      });

  }

  ngOnDestroy(): void {
      this.currentUserSub.unsubscribe();
  }

}
