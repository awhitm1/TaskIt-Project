import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../auth/user.model'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile.model';
import { Task } from 'src/app/tasklist/tasks/task.model';

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
  currentUserProfile: Profile;
  newProfile: Profile;
  allUsers: Profile[];
  firebaseRootUrlProfiles = "https://taskit-55d07-default-rtdb.firebaseio.com/profiles.json";

  constructor(private authsvc: AuthService, private http: HttpClient){}

  ngOnInit(): void {
   this.authUser = this.authsvc.currentUser.subscribe(data => {
    this.currentUser = data;
  });

   this.fetchProfiles();
  }

  fetchProfiles(){
    return this.http.get<Profile[]>(this.firebaseRootUrlProfiles, {}).subscribe((res: Profile[] | []) => {
      this.setProfiles(res)
    });
  }

  setProfiles(fetched: Profile[]){
    this.allUsers = fetched;
    if (this.currentUser.firstName){
      this.newProfile = new Profile(this.currentUser.id, this.currentUser.firstName, this.currentUser.lastName, this.currentUser.email, this.currentUser.imgPath);
      this.allUsers.push(this.newProfile);
      this.http.put(this.firebaseRootUrlProfiles, this.allUsers).subscribe(res => { console.log("Firebase Add Profile DB Response: ", res);});

    }
    this.currentUserProfile = this.getCurrentUserProfile(this.currentUser.id);


  }

  getCurrentUserProfile(localId){
    const profileIndex = this.allUsers.findIndex(profile => profile.localID === localId);

    if (profileIndex !== -1){
      console.log(this.allUsers[profileIndex])
      return this.allUsers[profileIndex]
    }
    console.error("Unknown User")
  }

  // newSignUp(){
  //   this.allUsers.push(this.currentUser);

  //   this.http.put(this.firebaseRootUrlProfiles, this.allUsers).subscribe(res => { console.log("Firebase DB Response (edit): ", res);});
  // }

  ngOnDestroy(): void {
  this.authUser.unsubscribe();
  }
}


