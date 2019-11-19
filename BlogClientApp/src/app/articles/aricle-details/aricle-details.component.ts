import { Component, OnInit, Input } from '@angular/core';
import { Post, ArticleService } from 'src/app/shared/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryService } from 'src/app/shared/category.service';
import { Tag, TagService } from 'src/app/shared/tag.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-aricle-details',
  templateUrl: './aricle-details.component.html',
  styleUrls: ['./aricle-details.component.css']
})
export class AricleDetailsComponent implements OnInit {

  defaultImage: string = "https://demo.morethanthemes.com/tourismplus8/default/sites/default/files/2017-06/video-poster.jpg";

  private id: number;
  articleItem:Post[] ;
  isAdmin = false;
  isEdit = false;

  notChangedCategory = true;
  notChangedTags = true;

  //Для редактирования статьи
  editedArticle: Post = {
    articleId: undefined,
    categoryId: undefined,
    categoryName:"",
    description:"",
    heroImage:"",
    name:"",
    publicationDate: undefined,
    shortDescription:"",
    tags: null
  };
  
  categories: Category[];
  tags: Tag[];



  constructor(private route: ActivatedRoute, private service: ArticleService, private router: Router, private tagService: TagService, private categoryService: CategoryService) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null)
    {
      this.isAdmin = true;
    }

    this.route.paramMap.subscribe(params =>{
      this.id = +params.get('id');
      this.getArticleById();
      //this.getAdditionalData();
    });

    this.getTags();
    this.getCategories();
  }

  //Получение статьи по id
  getArticleById(){
    this.service.getPost(this.id).subscribe(data => {
      this.articleItem = data;
      console.log(this.articleItem);
    },
    err => {
      console.log(err);
    });
  }
  
  //Закрыть статью
  goBack(){
    if(localStorage.getItem('token') != null)
    {
      this.router.navigateByUrl('/admin/adminarticles');
    }
    else{
      this.router.navigateByUrl('');
    }
  }

  //Удаление статьи
  deletePost(){
    let del = confirm("Удалить статью?");

    if(del){
      this.service.deletePost(this.id).subscribe(data =>{ 
        this.router.navigateByUrl('/admin/adminarticles');
      },
      err => {
        console.log(err);
      });
    }
  }

  //Открытие и заполнение формы обновления статьи при нажатии кнопки "Изменить"
  editArticle(){
    this.isEdit = !this.isEdit;

    if(!this.isEdit){
      return;
    }

    window.scrollTo(0,0);
    
    this.editedArticle.articleId = this.articleItem[0].articleId;
    this.editedArticle.categoryId = this.articleItem[0].categoryId;
    this.editedArticle.categoryName = this.articleItem[0].categoryName
    this.editedArticle.name = this.articleItem[0].name;
    this.editedArticle.shortDescription = this.articleItem[0].shortDescription;
    this.editedArticle.description = this.articleItem[0].description;
    this.editedArticle.heroImage = this.articleItem[0].heroImage;
    this.editedArticle.tags = this.articleItem[0].tags;

    console.log(this.editedArticle);
  }

  //Получение всех тэгов
  getTags(){
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
      console.log(this.tags);
    },
    err =>{
      console.log(err);
    })
  }

  //Получение всех категорий
  getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    },err => {
      console.log(err);
    })
  }

  //Обновление статьи
  updateArticle(updateForm: NgForm){

    if(this.notChangedCategory){
      this.editedArticle.categoryName = this.articleItem[0].categoryName;
    }else{
      this.editedArticle.categoryName = updateForm.value.categoryValue;

      this.categories.forEach(element => {
        if(element.categoryName === this.editedArticle.categoryName ){
          this.editedArticle.categoryId = element.categoryId;
        }
      });
    }

    if(this.notChangedTags){
      this.editedArticle.tags = this.articleItem[0].tags;
    }

    if(this.editedArticle.name.trim() === ''){
      this.editedArticle.name = this.articleItem[0].name;
    }

    if(this.editedArticle.shortDescription.trim() === ''){
      this.editedArticle.shortDescription = this.articleItem[0].shortDescription;
    }

    if(this.editedArticle.description.trim() === ''){
      this.editedArticle.description = this.articleItem[0].description;
    }

    if(this.editedArticle.heroImage.trim() === ''){
      this.editedArticle.heroImage = this.defaultImage;
    }

    this.editedArticle.publicationDate = new Date();

    this.service.updatePost(this.editedArticle).subscribe(() => {
      this.getArticleById();
      this.isEdit = false;

      this.notChangedCategory = true;
      this.notChangedTags = true;

    },err => {
      console.log(err);
    })
  
  }

  //Если категория статьи была изменена
  changedCategory(){
    this.notChangedCategory = false;
  }

  //Если тэги статьи были изменены
  changedTags(){
    this.notChangedTags = false;
  }

  //Сброс формы редактирования на значения по умолчанию
  restoreDefaultValues(){
    this.notChangedCategory = true;
    this.notChangedTags = true;

    this.editedArticle.articleId = this.articleItem[0].articleId;
    this.editedArticle.categoryId = this.articleItem[0].categoryId;
    this.editedArticle.categoryName = this.articleItem[0].categoryName;
    this.editedArticle.name = this.articleItem[0].name;
    this.editedArticle.shortDescription = this.articleItem[0].shortDescription;
    this.editedArticle.description = this.articleItem[0].description;
    this.editedArticle.heroImage = this.articleItem[0].heroImage;
    this.editedArticle.tags = this.articleItem[0].tags;
  }

}

