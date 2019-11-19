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
  next = false;

  tegsString : string;
  minDate: Date;
  maxDate: Date;

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
      this.getCategories();
      this.getTags();     
    }
  }

  //Получение статей
  getArticles(){
    this.loading = true;

    this.service.getPosts().subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.loading = false;
    },
    err =>{
      console.log(err);
    }); 
  }

  //Получение категорий
  getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    },
    err => {
      console.log(err);
    });
  }

  //Получение тэгов
  getTags(){
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
      console.log(this.tags);
    },
    err => {
      console.log(err);
    })
  }

  //Переход на предыдушую страницу
  onPrevPage(event: boolean){
    
    this.next = false;
    this.loading = true;

    this.service.getPosts(--this.page,this.categorySort,this.tegsString,this.minDate,this.maxDate).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.loading = false;
    });

    window.scrollTo(0,0);

    if(this.page === 1){ 
      this.prev=true;
      return;
    }
  }

  //Переход на следующую страницу
  onNextPage(){
    this.prev=false;
    this.loading = true;

    console.log(this.categorySort);

    this.service.getPosts(++this.page,this.categorySort,this.tegsString,this.minDate,this.maxDate).subscribe(data => {
      this.posts = data;
      console.log(this.posts);

      if(this.posts.length < 6){
        this.next = true;
      }

      this.loading = false;
    });

    window.scrollTo(0,0);

  }

  //Сортировка статей
  sortArticles(form: NgForm){
    console.log(form.value);

    if(form.value.tags === undefined || form.value.tags == null){
      this.tegsString = "none";
    }
    else{
      this.tegsString = form.value.tags.join();
    }

    if(form.value.firstDate == null || form.value.firstDate == undefined){
      this.minDate = new Date(2019,0,1);
      this.date1 = this.minDate;
    }
    else{
      this.minDate = form.value.firstDate;
    }

    if(form.value.secondDate == null || form.value.secondDate == undefined){
      this.maxDate = new Date();    
      this.date2 = this.maxDate;
    }
    else{
      this.maxDate = form.value.secondDate;
      this.maxDate.setDate(this.maxDate.getDate() + 1);
    }    

    this.page = 1;
    this.prev = true;
    this.next = false;

    this.service.getPosts(this.page,this.categorySort,this.tegsString,this.minDate,this.maxDate).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.loading = false;
    }, 
    err => {
      console.log(err);
    });
  }

  //Сбрасывает фильтры поиска
  resetForm(form: NgForm){
    form.reset();

    this.date1 = new Date(2019,0,1);
    this.date2 = new Date();
    this.categorySort = "none";

    this.page = 1;
    this.prev = true;
    this.next = false;
    this.getArticles();
  }

}

