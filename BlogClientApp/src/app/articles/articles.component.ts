import { Component, OnInit } from '@angular/core';
import { ArticleService, Post } from '../shared/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService, Category } from '../shared/category.service';
import { Tag, TagService } from '../shared/tag.service';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ArticleService, private router: Router, private categoryService: CategoryService, private tagService: TagService) { 

  }

  categorySort: string = "none";
  selectedTags:Tag[];
  date1 = new Date(2019,0,1);
  date2 = new Date();
  
  loading = true;

  posts: Post[];
  categories: Category[];
  tags:Tag[];
  
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
      this.getTags();
    
      
    }
  }


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
    });
  }

  getTags(){
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
      console.log(this.tags);
    },
    err => {
      console.log(err);
    })
  }

  
  onPrevPage(event: boolean){
    // console.log("Предыдущая страница");
    // console.log(event);

    // this.loading = true;

    // this.service.getPosts(--this.page,this.categorySort).subscribe(data => {
    //   this.posts = data;
    //   console.log(this.posts);
    //   this.loading = false;
    // });

    // if(this.page === 1){ 
    //   this.prev=true;
    //   return;
    // }
  }

  onNextPage(){

    // this.prev=false;
    // this.loading = true;

    // console.log(this.categorySort);

    // this.service.getPosts(++this.page,this.categorySort).subscribe(data => {
    //   this.posts = data;
    //   console.log(this.posts);
    //   this.loading = false;
    // });

  }

  sortArticles(form: NgForm){
    console.log(form.value);

    let tegsString : string;

    if(form.value.tags === undefined){
      tegsString = "none";
    }
    else{
      tegsString = form.value.tags.join();
    }
    
    console.log(tegsString);

    this.service.getPosts(1,this.categorySort,tegsString).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.loading = false;
    }, 
    err => {
      console.log(err);
    });
  }

}

