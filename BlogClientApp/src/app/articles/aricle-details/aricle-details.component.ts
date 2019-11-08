import { Component, OnInit } from '@angular/core';
import { Post, ArticleService } from 'src/app/shared/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aricle-details',
  templateUrl: './aricle-details.component.html',
  styleUrls: ['./aricle-details.component.css']
})
export class AricleDetailsComponent implements OnInit {

  private _id: number;
  articleItem: Post;

  isAdmin = false;
  
  constructor(private route: ActivatedRoute, private service: ArticleService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null)
    {
      this.isAdmin = true;
    }

    this.route.paramMap.subscribe(params =>{
    this._id = +params.get('id');
    });

    this.service.getPost(this._id).subscribe(data => {this.articleItem = data; console.log(this.articleItem);});
  }

  goBack(){
    if(localStorage.getItem('token') != null)
    {
      this.router.navigateByUrl('/admin/adminarticles');
    }
    else{
      this.router.navigateByUrl('');
    }
  }

  deletePost(){
    this.service.deletePost(this._id).subscribe(data =>{ 
      this.router.navigateByUrl('/admin/adminarticles');
    },
    err => {
      console.log(err);
    });
  }

}

