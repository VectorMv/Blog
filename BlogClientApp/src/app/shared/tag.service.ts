import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Tag{
  tagId: number;
  tagName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { 
    
  }

  readonly BaseURI = "http://localhost:50558/api/tags";

  //Получение всех тэгов
  getTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(this.BaseURI);
  }

  //Добавление нового тэга
  addTag(newTag: Tag){
    return this.http.post(this.BaseURI, newTag);
  }

  //Удаление тэга
  deleteTag(id: number){
    return this.http.delete(`${this.BaseURI}/${id}`);
  }

}
