import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService, Category } from 'src/app/shared/category.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  newCategory: string = "";
  selectedValue: string;

  oldValue:string;
  newValue:string ="";

  categories: Category[];

  addCategory = false;

  constructor(private service: CategoryService) { }

  ngOnInit() {

    this.addCategory = false;

    this.getCategories();

  }

  getCategories(){
    this.service.getCategories().subscribe(data => {
      this.categories = data
    },
    err => {
      console.log(err);
    });
  }

  AddCategory(form: NgForm){

    let ctgr = new Category;
    ctgr.categoryName = form.value.addCategory;

    this.service.addCategory(ctgr).subscribe(data => {
      this.getCategories();
      this.addCategory = false;
    },
    err => {
      console.log(err);
      this.addCategory = true;
    });
    
    form.reset();
  }

  DeleteCategory(form: NgForm){

    this.service.deleteCategory(form.value.deleteCtgr).subscribe(data => {
      this.getCategories();
    },
    err => {
      console.log(err);
    });

    form.reset();
  }

  UpdateCategory(form: NgForm){
    console.log(form.value);

    let category = new Category();

    category.categoryId = form.value.forUpdateId;
    category.categoryName = form.value.newCategory;
    
    console.log(category);

    this.service.updateCategory(category).subscribe(data => {
      this.getCategories();
    },
    err => {
      console.log(err);
    });

    form.reset();
  }
}
