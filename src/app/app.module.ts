import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GlobalValuesService } from './services/global-values.service';
import { QuestionsContainerComponent } from './components/questions-container/questions-container.component';
import { QuestionsService } from './services/questions.service';
import { ApiService } from './services/api-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    QuestionsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    GlobalValuesService,
    ApiService,
    QuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
