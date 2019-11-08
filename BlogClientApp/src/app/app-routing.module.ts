import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './articles/article/article.component';
import { AricleDetailsComponent } from './articles/aricle-details/aricle-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth/auth.guard';
import { CategoriesComponent } from './admin-panel/categories/categories.component';
import { AdminArticlesComponent } from './admin-panel/admin-articles/admin-articles.component';
import { TagsComponent } from './admin-panel/tags/tags.component';
import { CreateArticleComponent } from './admin-panel/create-article/create-article.component';


const routes: Routes = [
  {path:'',redirectTo:'articles',pathMatch:'full'},
  {path:'articles', component: ArticlesComponent },
  {
    path: 'user', component: UserComponent,
    children:[
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent }
    ]
  },
  {path:'articles/:id', component: AricleDetailsComponent },
  {
    path:'admin',component:AdminPanelComponent,canActivate:[AuthGuard],
    children:[
      {path:'categories',component:CategoriesComponent},
      {path:'adminarticles',component:AdminArticlesComponent},
      {path:'tags',component:TagsComponent},
      {path: 'create',component: CreateArticleComponent }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
