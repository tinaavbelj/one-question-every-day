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

import { UserService } from "./shared/user/user.service";
import { ArticleService } from "./shared/article/article.service";
import { QuestionService } from './shared/question/question.service';

import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
  { path: 'new-article', component: NewArticleComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'edit-article/:id', component: EditArticleComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'article/:id', component: ArticleComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
]

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
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    QuestionService,
    UserService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
