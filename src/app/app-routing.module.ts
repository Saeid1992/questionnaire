import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';

const routes: Routes = [
  {path:'', redirectTo:'/welcome', pathMatch:'full'},
  {path:'welcome', component:WelcomeComponent},
  {path:'questions-container', component:QuestionsContainerComponent},
  {path:'**', component:PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
