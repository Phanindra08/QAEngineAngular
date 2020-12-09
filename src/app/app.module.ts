import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { BadRequestComponent } from './Components/bad-request/bad-request.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { EditMyQuestionComponent } from './Components/edit-my-question/edit-my-question.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ViewAllQuestionsComponent } from './Components/view-all-questions/view-all-questions.component';
import { ViewAnswersComponent } from './Components/view-answers/view-answers.component';
import { ViewMyAnswersComponent } from './Components/view-my-answers/view-my-answers.component';
import { ViewMyQuestionAnswersComponent } from './Components/view-my-question-answers/view-my-question-answers.component';
import { ViewMyQuestionsComponent } from './Components/view-my-questions/view-my-questions.component';
import { authInterceptorProviders } from './helper/auth.interceptor';
import {UserService} from './service/user.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    CreateAccountComponent,
    AddQuestionComponent,
    EditMyQuestionComponent,
    ViewAllQuestionsComponent,
    ViewAnswersComponent,
    ViewMyAnswersComponent,
    ViewMyQuestionAnswersComponent,
    ViewMyQuestionsComponent,
    LoginComponent,
    HeaderComponent,
    BadRequestComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [authInterceptorProviders, UserService],
})
export class AppModule { }
