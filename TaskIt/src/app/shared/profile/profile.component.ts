import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../auth/user.model'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  authUserSub: Subscription;
  profileSub: Subscription;
  allProfiles: Subscription;
  fetchedSetProfiles: Profile[];
  currentUser: User;
  currentUserProfile: Profile;

  constructor(private authsvc: AuthService, private profsvc: ProfileService){}

  ngOnInit(): void {
    this.profsvc.fetchProfiles();
    this.authUserSub = this.authsvc.currentUser.subscribe(data => {
      console.log("current user (profile comp): ",data);
      this.currentUser = data;
    });
    this.profileSub = this.profsvc.currentProfileSet.subscribe(data => {
      console.log("current profile sub: ", data);
      this.currentUserProfile = data;
    })


    // this.allProfiles = this.profsvc.profilesSet.subscribe(profiles => {
    //   this.fetchedSetProfiles = profiles;

    //   const profileIndex = this.fetchedSetProfiles.findIndex(profile => profile.localID === this.currentUser.id);
    //   if (profileIndex == -1) {

    //   }
    //   this.currentUserProfile = this.fetchedSetProfiles[profileIndex];
    // })

  }

  ngOnDestroy(): void {
  this.authUserSub.unsubscribe();
  this.profileSub.unsubscribe();
  // this.allProfiles.unsubscribe();
  }
}


