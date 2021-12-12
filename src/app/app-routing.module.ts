import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionsContainerComponent } from './components/questions-container/questions-container.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  {path:'', redirectTo:'/welcome', pathMatch:'full'},
  {path:'welcome', component:WelcomeComponent},
  {path:'questions-container', component:QuestionsContainerComponent},
  {path:'result/:key', component:ResultComponent},
  {path:'**', component:PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
