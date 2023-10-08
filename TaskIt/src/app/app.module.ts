import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedComponent } from './shared/shared.component';
import { UserComponent } from './shared/user/user.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TasksComponent } from './tasklist/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SharedComponent,
    UserComponent,
    ProfileComponent,
    TasklistComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
