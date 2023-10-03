import { Component } from '@angular/core';
import { User } from '../user/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  myProfile: User[] = [
    new User('Aaron Whitmer', 'myemail@myemail.com','https://source.unsplash.com/50x50/?scenery')
  ];
}


