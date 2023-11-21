import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  firebaseRootUrlProfiles = "https://taskit-55d07-default-rtdb.firebaseio.com/profiles.json";

  allUsers: Profile[];
  newProfile: Profile;

  constructor(private http: HttpClient) { }

  fetchProfiles(){
    return this.http.get<Profile[]>(this.firebaseRootUrlProfiles, {}).subscribe((res: Profile[] | []) => {
      this.setProfiles(res);
      console.log("fetch profiles: ", res)
    });
  }

  setProfiles(profiles: Profile[]){
    this.allUsers = profiles;
    console.log("set profiles: ", this.allUsers);
  }

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
