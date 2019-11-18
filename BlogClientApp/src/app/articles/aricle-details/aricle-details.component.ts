import { Component, OnInit, Input } from '@angular/core';
import { Post, ArticleService } from 'src/app/shared/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryService } from 'src/app/shared/category.service';
import { Tag, TagService } from 'src/app/shared/tag.service';

@Component({
  selector: 'app-aricle-details',
  templateUrl: './aricle-details.component.html',
  styleUrls: ['./aricle-details.component.css']
})
export class AricleDetailsComponent implements OnInit {

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
  }

  getArticleById(){
    this.service.getPost(this.id).subscribe(data => {
      this.articleItem = data;
      console.log(this.articleItem);
    },
    err => {
      console.log(err);
    });
  }

  // getAdditionalData(){
  //   this.additionalService.getAdditionalInfo(this.id).subscribe(data => {
  //     this.additionalData =  data;
  //     console.log(this.additionalData);
  //   },
  //   err => {
  //     console.log(err);
  //   });
  // }
  
  goBack(){
    if(localStorage.getItem('token') != null)
    {
      this.router.navigateByUrl('/admin/adminarticles');
    }
    else{
      this.router.navigateByUrl('');
    }
  }

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

  editArticle(){
    this.isEdit = !this.isEdit;

    if(!this.isEdit){
      return;
    }

    window.scrollTo(0,0);

    if(this.tags == null || this.tags == undefined){
      this.getTags();
    }
    if(this.categories == null || this.categories == undefined){
      this.getCategories();
    }
    
    this.editedArticle.articleId = this.articleItem[0].articleId;
    this.editedArticle.categoryId = this.articleItem[0].categoryId;
    this.editedArticle.name = this.articleItem[0].name;
    this.editedArticle.shortDescription = this.articleItem[0].shortDescription;
    this.editedArticle.description = this.articleItem[0].description;
    this.editedArticle.heroImage = this.articleItem[0].heroImage;
  
    console.log(this.editedArticle);
  }

  getTags(){
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
      this.editedArticle.tags = this.articleItem[0].tags;
      console.log(this.tags);
    },
    err =>{
      console.log(err);
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    },err => {
      console.log(err);
    })
  }

  changedCategory(){
    this.notChangedCategory = false;
  }

  changedTags(){
    this.notChangedTags = false;
  }

}

