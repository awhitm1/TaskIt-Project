import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { TasklistComponent } from "./tasklist/tasklist.component"
import { KanBanComponent } from "./kan-ban/kan-ban.component"
import { LandingPageComponent } from "./landing-page/landing-page.component"
import { SharedComponent } from "./shared/shared.component"
import { ProfileComponent } from "./shared/profile/profile.component"
import { NotificationsComponent } from "./shared/notifications/notifications.component"
import { UserComponent } from "./shared/user/user.component"
import { AuthComponent } from "./shared/auth/auth.component"


const appRoutes: Routes = [
  {path: "", redirectTo: "/landing", pathMatch: "full"},
  {path: "landing", component: LandingPageComponent},
  {path: "tasklist", component: TasklistComponent},
  {path: "kanban", component: KanBanComponent},
  {path: "auth", component: AuthComponent},
  {path: "shared", component: SharedComponent,
          children: [{path: "profile", component: ProfileComponent},
                      {path: "notifications", component: NotificationsComponent},{path: "user", component: UserComponent}
                    ]}

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
