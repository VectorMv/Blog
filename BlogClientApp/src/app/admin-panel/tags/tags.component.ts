import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TagService, Tag } from 'src/app/shared/tag.service';



@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  newTag: string = "";
  selectedValue: string;

  addTag = false;
  emptyAddField = false;
  selectedTag = false;

  tag: Tag[];

  constructor(private service: TagService) { }

  ngOnInit() {
    this.addTag = false;
    this.getAllTags();
  }

  //Получние всех тэгов
  getAllTags(){
    this.service.getTags().subscribe(data => {
      this.tag = data;
    },
    err => {
      console.log(err);
    });
  }

  //Добавление нового тэга
  AddTag(form: NgForm){

    if(form.value.addTag.trim() == ''){
      this.emptyAddField = true;
      return;
    }
    
    this.emptyAddField = false;

    let tag = new Tag;
    tag.tagName = form.value.addTag.trim();

    this.service.addTag(tag).subscribe(data => {
      this.getAllTags();
      this.addTag = false;
    },
    err => {
      console.log(err);
      this.addTag = true;
    });
    
    form.reset();
  }

  //Удаление тэга
  DeleteTag(form: NgForm){
    console.log(form.value.deleteTagId);

    if(form.value.deleteTagId === undefined){
      this.selectedTag = true;
      return;
    }

    this.selectedTag = false;

    this.service.deleteTag(form.value.deleteTagId).subscribe(data => {
      this.getAllTags();
    },
    err => {
      console.log(err);
    });

    form.reset();
  }

}
