import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Category{
  categoryId: number;
  categoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  readonly BaseURI = "http://localhost:50558/api/categories";

  //Получение всех категорий
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.BaseURI);
  }

  //Добавление новой категории
  addCategory(newCategory: Category){
    return this.http.post(this.BaseURI, newCategory);
  }

  //Удаление категории 
  deleteCategory(id: number){
    return this.http.delete(`${this.BaseURI}/${id}`);
  }

  //Изменение определенной категории
  updateCategory(category: Category){
    return this.http.put(`${this.BaseURI}/${category.categoryId}`, category);
  }
}

