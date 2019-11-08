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

  
  selectedCategory: string;
  categories: Category[];
  tags: Tag[];

  selectedTags:Tag[];

  constructor(private serviceCtgr: CategoryService, private serviceTag: TagService, private serviceArtc: ArticleService, private router: Router) { }

  ngOnInit() {

    this.getCategories();
    this.getTags()
  }

  
  getCategories(){
    this.serviceCtgr.getCategories().subscribe(data => {
      this.categories = data
    },
    err => {
      console.log(err);
    });
  }

  getTags(){
    this.serviceTag.getTags().subscribe(data => {
      this.tags = data
    },
    err => {
      console.log(err);
    });
  }

  createNewArticle(form: NgForm){
    console.log("статья добавлена");

    let newArtc = new Post();

    newArtc.categoryId = form.value.categoryValue;
    newArtc.heroImage = form.value.imageLink;
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

  resetForm(form: NgForm){
    form.reset();
  }


}
