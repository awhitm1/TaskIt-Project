import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { TasklistComponent } from "./tasklist/tasklist.component"
import { KanBanComponent } from "./kan-ban/kan-ban.component"
import { LandingPageComponent } from "./landing-page/landing-page.component"


const appRoutes: Routes = [
  {path: "", redirectTo: "/landing", pathMatch: "full"},
  {path: "landing", component: LandingPageComponent},
  {path: "tasklist", component: TasklistComponent},
  {path: "kanban", component: KanBanComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
