import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/user.model';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  firebaseRootUrlProfiles = "https://taskit-55d07-default-rtdb.firebaseio.com/profiles.json";
  currentProfileSet = new Subject<Profile>();
  allUsers: Profile[];
  newProfile: Profile;
  currentUserProfile: Profile;


  constructor(private http: HttpClient, private authsvc: AuthService) { }

  fetchProfiles(){
    this.http.get<Profile[]>(this.firebaseRootUrlProfiles, {}).subscribe((res: Profile[] | []) => {
      const currentUser = this.authsvc.currentUser.value;
      console.log("fetch profiles: ", res);
      this.allUsers = res;

      const currentUserIdx = this.allUsers.findIndex(users => users.localID === currentUser.id);
      if (currentUserIdx == -1 && (!!currentUser.firstName || !!currentUser.lastName)){
        this.newProfile = {localID: currentUser.id, email: currentUser.email, imgPath: currentUser.imgPath, firstName: currentUser.firstName, lastName: currentUser.lastName}
        this.allUsers.push(this.newProfile);
        this.http.put(this.firebaseRootUrlProfiles, this.allUsers).subscribe(res=> console.log("Profiles updated: ", res));
        this.currentUserProfile = this.newProfile;
        this.currentProfileSet.next(this.currentUserProfile);

      } else if (currentUserIdx != -1){
        this.currentUserProfile = this.allUsers[currentUserIdx];
        this.currentProfileSet.next(this.currentUserProfile);
      }

      console.log("current profile: ", this.currentUserProfile);

    });
  }

  // setProfiles(profiles: Profile[]){
  //   this.allUsers = profiles;
  //   console.log("set profiles: ", this.allUsers);

  // }

  addNewProfile(prof: Profile) {
    console.log("add profile allusers: ", this.allUsers);
      // this.fetchProfiles();
      this.allUsers.push(prof);
      this.http.put(this.firebaseRootUrlProfiles, this.allUsers).subscribe(res => { console.log("Firebase Add Profile DB Response: ", res);});
  }

  delProfile() {

  }

  getCurrentUserProfile(localId){
    const profileIndex = this.allUsers.findIndex(profile => profile.localID === localId);

    if (profileIndex !== -1){

      return this.allUsers[profileIndex]
    }
    console.error("Unknown User")
  }

}
