import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './articles/article/article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { ArticleService } from './shared/article.service';
import { LoginComponent } from './user/login/login.component';
import { AricleDetailsComponent } from './articles/aricle-details/aricle-details.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoriesComponent } from './admin-panel/categories/categories.component';
import { AdminArticlesComponent } from './admin-panel/admin-articles/admin-articles.component';
import { TagsComponent } from './admin-panel/tags/tags.component';
import { ArticleExtendedComponent } from './admin-panel/article-extended/article-extended.component';
import { TagService } from './shared/tag.service';
import { CategoryService } from './shared/category.service';
import { CreateArticleComponent } from './admin-panel/create-article/create-article.component';
import { AdditionalDataService } from './shared/additional-data.service';




@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    AricleDetailsComponent,
    PaginationComponent,
    AdminPanelComponent,
    CategoriesComponent,
    AdminArticlesComponent,
    TagsComponent,
    ArticleExtendedComponent,
    CreateArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    HttpClientModule,
    MatTabsModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    UserService, 
    ArticleService,
    TagService,
    CategoryService,
    AdditionalDataService
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
