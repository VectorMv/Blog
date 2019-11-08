import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) {}

  readonly BaseURI = "http://localhost:50558/api";

  formModule = this.fb.group({
    UserName:['', Validators.required],
    Email:['', Validators.email],
    FullName:[''],

    Passwords:this.fb.group({
      Password:['', [Validators.required,Validators.minLength(6)]],
      ConfirmPassword:['', Validators.required]
    },{ validator : this.comparePasswords })

  });
  
  comparePasswords(fb:FormGroup){

    let confirmPasswordCtrl =  fb.get('ConfirmPassword');

    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if(fb.get('Password').value != confirmPasswordCtrl.value){
        confirmPasswordCtrl.setErrors({ passwordMismatch : true });
      }
      else{
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }

  register(){
    let body ={
      UserName: this.formModule.value.UserName,
      Email: this.formModule.value.Email,
      FullName: this.formModule.value.FullName,
      Password: this.formModule.value.Passwords.Password,
    }
    
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData){
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile(){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI +'/UserProfile', {headers: tokenHeader})
  }
  
}
