import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionDetailsGuardService } from './question-details/question-details-guard.service';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LandscapeComponent } from './landscape/landscape.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent } from './questions/questions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { UserComponent } from './user/user.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    LoginComponent,
    AboutComponent,
    AdminPanelComponent,
    QuestionDetailsComponent,
    HomeComponent,
    NavigationComponent,
    LandscapeComponent,
    ProfileComponent,
    RegisterComponent,
    QuestionsComponent,
    LeaderboardComponent,
    UserComponent,
    NewArticleComponent,
    ArticlesComponent,
    ArticleComponent,
    EditArticleComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'question', component: QuestionComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'admin-panel', component: AdminPanelComponent},
      { path: 'questions', component: QuestionsComponent},
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'leaderboard', component: LeaderboardComponent },
      { path: 'new-article', component: NewArticleComponent },
      { path: 'edit-article/:id', component: EditArticleComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: 'article/:id', component: ArticleComponent },
      { path: 'result', component: ResultComponent},
      { path: 'user/:id', component: UserComponent },
      { path: 'question-details/:id', 
        canActivate:[ QuestionDetailsGuardService ],
        component: QuestionDetailsComponent},
      { path: '', redirectTo: 'question', pathMatch: 'full'}
      /* { path: 'question/:id', component: QuestionDetailComponent } */
    ]),
    FormsModule,
    HttpClientModule
  ],
  providers: [QuestionDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
