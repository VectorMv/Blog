import { Component, OnInit } from '@angular/core';
import { ArticleService, Post } from '../shared/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService, Category } from '../shared/category.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ArticleService, private router: Router, private categoryService: CategoryService) { 

  }

  categorySort: string = "none";
  loading = true;

  posts: Post[];
  categories: Category[];

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

    // this.route.queryParams.subscribe(params =>{
    //   this.page = +params['page'];
    //   //console.log(this.page);
    //   this.getArticles();
    //   });
      this.getArticles();
      this.getCategories();
    
      
    }
  }

  // onSelect(article: Post){

  //   console.log("здесь" + article.articleId)
  //   this.router.navigateByUrl('/articles/' + article.articleId);
  // }

  getArticles(){
    this.loading = true;

    this.service.getPosts(this.page,this.categorySort).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.loading = false;
    },
    err =>{
      console.log(err);
    });
    
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    },
    err => {
      console.log(err);
    })
  }

  
  onPrevPage(event: boolean){
    console.log("Предыдущая страница");
    console.log(event);

    this.loading = true;

    this.service.getPosts(--this.page,this.categorySort).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.loading = false;
    });

    if(this.page === 1){ 
      this.prev=true;
      return;
    }
  }

  onNextPage(){

    this.prev=false;
    this.loading = true;

    console.log(this.categorySort);

    this.service.getPosts(++this.page,this.categorySort).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.loading = false;
    });

  }

  sortArticles(){
    this.service.getPosts(1,this.categorySort).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.loading = false;
    }, 
    err => {
      console.log(err);
    });
  }

}
