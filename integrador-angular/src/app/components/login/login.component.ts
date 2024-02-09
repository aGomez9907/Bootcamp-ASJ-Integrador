import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
user=""
pass=""


constructor(private loginService: LoginService){}

ngOnInit(): void {
  
}
login(){
  this.loginService.tryLogIn(this.user,this.pass)
  location.reload()
}

}
