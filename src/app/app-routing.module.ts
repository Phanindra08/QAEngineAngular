import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddQuestionComponent }  from './Components/add-question/add-question.component';
import { ViewAllQuestionsComponent }  from './Components/view-all-questions/view-all-questions.component';
import { CreateAccountComponent }  from './Components/create-account/create-account.component';
import { LoginComponent }  from './Components/login/login.component';
import { ViewMyQuestionsComponent }  from './Components/view-my-questions/view-my-questions.component';
import { ViewMyAnswersComponent }  from './Components/view-my-answers/view-my-answers.component';
import { ViewAnswersComponent }  from './Components/view-answers/view-answers.component';
import { ViewMyQuestionAnswersComponent }  from './Components/view-my-question-answers/view-my-question-answers.component';
import { EditMyQuestionComponent }  from './Components/edit-my-question/edit-my-question.component';
import { PageNotFoundComponent }  from './Components/page-not-found/page-not-found.component';
import { BadRequestComponent }  from './Components/bad-request/bad-request.component';

const routes: Routes = [
  {path:'',redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'view-all-questions', component: ViewAllQuestionsComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'view-answers/:id', component: ViewAnswersComponent },
	{ path: 'add-question', component: AddQuestionComponent },
	{ path: 'view-my-questions', component: ViewMyQuestionsComponent },
	{ path: 'view-my-answers', component: ViewMyAnswersComponent },
  { path: 'view-my-question-answers/:id', component: ViewMyQuestionAnswersComponent },
  { path: 'edit-my-question/:id', component: EditMyQuestionComponent },
  { path: 'bad-request', component: BadRequestComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
