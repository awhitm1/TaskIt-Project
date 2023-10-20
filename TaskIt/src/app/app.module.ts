import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedComponent } from './shared/shared.component';
import { UserComponent } from './shared/user/user.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KanBanComponent } from './kan-ban/kan-ban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SharedComponent,
    UserComponent,
    ProfileComponent,
    TasklistComponent,
    KanBanComponent,
    LandingPageComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    DragDropModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
