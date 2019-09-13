import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuizComponent } from "./components/quiz/quiz.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthenticationGuard } from './guards/authentication.guard';
import { AnswersComponent } from './components/answers/answers.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "quiz",
    component: QuizComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "answers",
    component: AnswersComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
