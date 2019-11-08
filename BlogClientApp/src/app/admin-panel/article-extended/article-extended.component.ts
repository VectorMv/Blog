import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/article.service';

@Component({
  selector: 'app-article-extended',
  templateUrl: './article-extended.component.html',
  styleUrls: ['./article-extended.component.css']
})
export class ArticleExtendedComponent implements OnInit {

  constructor(private sanitization: DomSanitizer,private router: Router) { }

  @Input() articleItem: Post;


  ngOnInit() {
  }

  onClick(articleId: number){
    console.log("from Article: " + articleId);
    this.router.navigate(['/articles/',articleId])
  }
}
