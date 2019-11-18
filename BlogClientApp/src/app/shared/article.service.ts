import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Post{
  articleId:number;
  name:string;
  shortDescription:string;
  description:string;
  heroImage:string;
  categoryId:number;
  categoryName:string;
  publicationDate: Date;
  tags: [];
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  readonly BaseURI = "http://localhost:50558/api/articles";

  getPosts(pageNumber: number = 1, categorySort: string = "none", tagsSort: string = "none", minDate: Date = new Date(2000,0,1), maxDate: Date = new Date()): Observable<Post[]>{

    return this.http.get<Post[]>(`${this.BaseURI}?categorySort=${categorySort}&tagsSort=${tagsSort}&minDate=${minDate.toISOString()}&maxDate=${maxDate.toISOString()}&page=${pageNumber}`);

  }

  getPost(articleId:number):Observable<Post[]>{

    console.log("получение статьи по id: " + articleId);
    return this.http.get<Post[]>(`${this.BaseURI}/${articleId}`);
  }

  addPost(article: Post){

    console.log(article);
    return this.http.post(this.BaseURI, article);
  }

  deletePost(id: number){
    console.log(id);
    return this.http.delete(`${this.BaseURI}/${id}`);
  }
}

