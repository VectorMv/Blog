import { Component, OnInit } from '@angular/core';
import { Post, ArticleService } from 'src/app/shared/article.service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.css']
})
export class AdminArticlesComponent implements OnInit {

  posts: Post[];
  page:number = 1;
  prev = true;

  loading = true;

  constructor(private service: ArticleService) { }

  ngOnInit() {
    this.loading = true;
    this.getArticles();
  }

  getArticles(){
    this.loading = true;
    this.service.getPosts().subscribe(data => {this.posts = data;console.log(this.posts); this.loading = false;});
    
  }

  onPrevPage(){
    console.log("Предыдущая страница");

    this.loading = true;

    this.service.getPosts(--this.page).subscribe(data => {this.posts = data;console.log(this.posts); this.loading = false;});
    if(this.page === 1){ this.prev=true;return;}
  }

  onNextPage(){

    this.loading = true;

    this.prev=false;
    this.service.getPosts(++this.page).subscribe(data => {this.posts = data;console.log(this.posts); this.loading = false;});

  }

}
