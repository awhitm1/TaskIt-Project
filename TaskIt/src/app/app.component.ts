import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './shared/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  authSub: Subscription;
  constructor(private router: Router, private authsvc: AuthService){}

  ngOnInit(): void {
    this.authSub = this.authsvc.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }


}
