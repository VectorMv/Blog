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

  getTags(): Observable<Tag[]>{

    return this.http.get<Tag[]>(this.BaseURI);
  }

  addTag(newTag: Tag){

    return this.http.post(this.BaseURI, newTag);
  }

  deleteTag(id: number){

    return this.http.delete(`${this.BaseURI}/${id}`);
  }

}
