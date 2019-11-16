import { Component, OnInit, Input } from '@angular/core';
import { Post, ArticleService } from 'src/app/shared/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalDataService, AdditionalInfo } from 'src/app/shared/additional-data.service';

@Component({
  selector: 'app-aricle-details',
  templateUrl: './aricle-details.component.html',
  styleUrls: ['./aricle-details.component.css']
})
export class AricleDetailsComponent implements OnInit {

  private id: number;
  articleItem:Post[] ;
  isAdmin = false;

  //additionalData:AdditionalInfo[];
  
  constructor(private route: ActivatedRoute, private service: ArticleService, private router: Router, private additionalService: AdditionalDataService ) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null)
    {
      this.isAdmin = true;
    }

    this.route.paramMap.subscribe(params =>{
      this.id = +params.get('id');
      this.getArticleById();
      //this.getAdditionalData();
    });

    
  }

  getArticleById(){
    this.service.getPost(this.id).subscribe(data => {
      this.articleItem = data;
      console.log(this.articleItem);
    },
    err => {
      console.log(err);
    });
  }

  // getAdditionalData(){
  //   this.additionalService.getAdditionalInfo(this.id).subscribe(data => {
  //     this.additionalData =  data;
  //     console.log(this.additionalData);
  //   },
  //   err => {
  //     console.log(err);
  //   });
  // }
  
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
    this.service.deletePost(this.id).subscribe(data =>{ 
      this.router.navigateByUrl('/admin/adminarticles');
    },
    err => {
      console.log(err);
    });
  }

}

