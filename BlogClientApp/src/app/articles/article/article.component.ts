import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/shared/article.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private sanitization: DomSanitizer,private router: Router) { }

  @Input() articleItem: Post;

  ngOnInit() {
    
  }

  onClick(articleId: number):void{
    this.router.navigateByUrl('/articles/' + articleId);
  }

}
