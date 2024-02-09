import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'integrador-angular';
  openFlag: boolean = false

  changeWidth(isOpen: boolean){
    this.openFlag = isOpen
  }
}
