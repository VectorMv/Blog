import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AdditionalInfo{
  tags: [];
  categoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdditionalDataService {

  constructor(private http: HttpClient) { }

  private readonly GetAdditionalInfoURL = "http://localhost:50558/api/AdditionalData";

  getAdditionalInfo(articleId: number):Observable<AdditionalInfo[]>{
    return this.http.get<AdditionalInfo[]>(`${this.GetAdditionalInfoURL}?id=${articleId}`);
  }
}
