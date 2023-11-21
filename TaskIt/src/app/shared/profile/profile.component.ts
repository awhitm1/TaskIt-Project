import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../auth/user.model'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  authUser: Subscription;
  currentUser: User;
  currentUserProfile: Profile;

  constructor(private authsvc: AuthService, private profsvc: ProfileService){}

  ngOnInit(): void {
   this.authUser = this.authsvc.currentUser.subscribe(data => {
    this.currentUser = data;
  });

   this.profsvc.fetchProfiles();
  }

  ngOnDestroy(): void {
  this.authUser.unsubscribe();
  }
}


