import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/shared/category.service';
import { NgForm } from '@angular/forms';
import { Tag, TagService } from 'src/app/shared/tag.service';
import { Post, ArticleService } from 'src/app/shared/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  defaultImage: string = "https://demo.morethanthemes.com/tourismplus8/default/sites/default/files/2017-06/video-poster.jpg";
  selectedCategory: string;
  categories: Category[];
  tags: Tag[];

  selectedTags:Tag[];

  constructor(private serviceCtgr: CategoryService, private serviceTag: TagService, private serviceArtc: ArticleService, private router: Router) { }

  ngOnInit() {

    this.getCategories();
    this.getTags()
  }

  //Получение всех категорий
  getCategories(){
    this.serviceCtgr.getCategories().subscribe(data => {
      this.categories = data
    },
    err => {
      console.log(err);
    });
  }

  //Получение всех тэгов
  getTags(){
    this.serviceTag.getTags().subscribe(data => {
      this.tags = data
    },
    err => {
      console.log(err);
    });
  }

  //Создание новой статьи
  createNewArticle(form: NgForm){
    console.log("статья добавлена");

    let newArtc = new Post();

    newArtc.categoryId = form.value.categoryValue;
    
    if(form.value.imageLink.trim() === ''){
      newArtc.heroImage = this.defaultImage;
    }else{
      newArtc.heroImage = form.value.imageLink;
    }
    
    newArtc.name = form.value.name;
    newArtc.shortDescription = form.value.shortDescr;
    newArtc.description = form.value.fullDescr;
    newArtc.tags = form.value.tags;
    newArtc.publicationDate = new Date();

    console.log(newArtc)

    this.serviceArtc.addPost(newArtc).subscribe(data => {

    },
    err => {
      console.log(err);
    });

    form.reset();

  }

  //Сброс значений формы.
  resetForm(form: NgForm){
    form.reset();
  }
}
