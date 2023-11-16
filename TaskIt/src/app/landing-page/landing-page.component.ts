import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private authsvc: AuthService){}

  loginMode(value: boolean){
    this.authsvc.setIsLogInMode(value);
  }
}
