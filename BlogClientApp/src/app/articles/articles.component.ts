import { Component, OnInit } from '@angular/core';
import { ArticleService, Post } from '../shared/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private service: ArticleService, private router: Router) { }
  loading = true;
  posts: Post[];

  page:number = 1;
  prev = true;

  ngOnInit() {
    this.loading = true;
    if(localStorage.getItem('token') != null)
    {
      this.loading = false;
      this.router.navigateByUrl('/admin/adminarticles');
    }
    else
    {
      this.getArticles();
    }
  }


  getArticles(){
    this.loading = true;
    this.service.getPosts().subscribe(data => {this.posts = data;console.log(this.posts);this.loading = false;});
    
  }
  
  onPrevPage(){
    console.log("Предыдущая страница");

    this.loading = true;

    this.service.getPosts(--this.page).subscribe(data => {this.posts = data;console.log(this.posts);this.loading = false;});
    if(this.page === 1){ this.prev=true;return;}
  }

  onNextPage(){
    this.prev=false;

    this.loading = true;

    this.service.getPosts(++this.page).subscribe(data => {this.posts = data;console.log(this.posts);this.loading = false;});

  }

}
