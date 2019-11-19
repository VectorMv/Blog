import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationSuccess = false;
  registrationFail = false;

  constructor(public service:UserService) { }

  ngOnInit() {
    this.service.formModule.reset();
  }

  //Регистрация нового пользователя
  onSubmit(){
    this.service.register().subscribe(
      (res:any) =>{
        if(res.succeeded){
          this.service.formModule.reset();
          this.registrationFail = false;
          this.registrationSuccess = true;
        }
        else{
          res.errors.forEach(element =>{
            this.registrationSuccess = false;
            this.registrationFail = true;
            switch(element.code){
              case 'DuplicateUserName':
                break;
              default:
                break;
            }
          })
          
        }
      },
      err =>{
        console.log(err);
      }
    );
  }
}
