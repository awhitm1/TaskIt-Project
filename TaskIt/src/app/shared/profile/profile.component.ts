import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../auth/user.model'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  // myProfile: User[] =
  //   [new User ('Aaron Whitmer','myemail@myemail.com','https://source.unsplash.com/50x50/?scenery')];

  authUser: Subscription;
  currentUser: User;

  constructor(private authsvc: AuthService){}

  ngOnInit(): void {
   this.authUser = this.authsvc.currentUser.subscribe(data => {
    this.currentUser = data;
    console.log("Current User: ", this.currentUser)
   })
  }

  ngOnDestroy(): void {
  this.authUser.unsubscribe();
  }
}


