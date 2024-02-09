import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = 'admin';
  pass = 'password';

  constructor() {}

  tryLogIn(user: string, pass: string) {
    let result = this.user === user && this.pass===pass
    if(result){
      sessionStorage.setItem('loggedin', 'true')
    }
    return result;
  }

  isLoggedIn():boolean{
    return sessionStorage.getItem('loggedin') == 'true'
  }
}
