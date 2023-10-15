import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedComponent } from './shared/shared.component';
import { UserComponent } from './shared/user/user.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { TasklistComponent } from './tasklist/tasklist.component';

import { KanBanComponent } from './kan-ban/kan-ban.component';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SharedComponent,
    UserComponent,
    ProfileComponent,
    TasklistComponent,

    KanBanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KanbanModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
