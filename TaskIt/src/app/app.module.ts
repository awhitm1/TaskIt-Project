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
import { DragDropModule, CdkDragPlaceholder } from '@angular/cdk/drag-drop';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

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
    NotificationsComponent,

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
    AppRoutingModule,
    CdkDragPlaceholder,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule

  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "EE. MMM. dd, YYY h:mm a "}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
