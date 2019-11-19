import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  notFound = false;

  formModel ={
    UserName:'',
    Password:''
  }
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  //Авторизация пользователя
  onSubmit(form: NgForm){
    this.service.login(form.value).subscribe(
      (res:any) => {
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/admin/adminarticles');
      },
      error => { this.notFound = true;}
    );
  }
}
