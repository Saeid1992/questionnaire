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
import { TextQuestionComponent } from './components/questions-container/question/text-question/text-question.component';
import { MultipleChoiceQuestionComponent } from './components/questions-container/question/multiple-choice-question/multiple-choice-question.component';
import { QuestionComponent } from './components/questions-container/question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    QuestionsContainerComponent,
    TextQuestionComponent,
    MultipleChoiceQuestionComponent,
    QuestionComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GlobalValuesService,
    ApiService,
    QuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
