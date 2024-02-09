import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'integrador-angular';
  openFlag: boolean = false
  loggedIn=false

  constructor(private loginService : LoginService){}


ngOnInit(): void {
  this.loggedIn = this.loginService.isLoggedIn()
}

  changeWidth(isOpen: boolean){
    this.openFlag = isOpen
  }
}
