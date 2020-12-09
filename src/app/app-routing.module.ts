import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { BadRequestComponent } from './Components/bad-request/bad-request.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { EditMyQuestionComponent } from './Components/edit-my-question/edit-my-question.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ViewAllQuestionsComponent } from './Components/view-all-questions/view-all-questions.component';
import { ViewAnswersComponent } from './Components/view-answers/view-answers.component';
import { ViewMyAnswersComponent } from './Components/view-my-answers/view-my-answers.component';
import { ViewMyQuestionAnswersComponent } from './Components/view-my-question-answers/view-my-question-answers.component';
import { ViewMyQuestionsComponent } from './Components/view-my-questions/view-my-questions.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view-all-questions', component: ViewAllQuestionsComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'view-answers/:id', component: ViewAnswersComponent },
  { path: 'view-my-questions', component: ViewMyQuestionsComponent },
  { path: 'view-my-answers', component: ViewMyAnswersComponent },
  { path: 'view-my-question-answers/:id', component: ViewMyQuestionAnswersComponent },
  { path: 'edit-my-question/:id', component: EditMyQuestionComponent },
  { path: 'bad-request', component: BadRequestComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
