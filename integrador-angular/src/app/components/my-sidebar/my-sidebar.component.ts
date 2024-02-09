import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-sidebar',
  templateUrl: './my-sidebar.component.html',
  styleUrl: './my-sidebar.component.css'
})
export class MySidebarComponent {
  @Output()
  private flagSidebar: EventEmitter<boolean> = new EventEmitter();
  constructor(private router: Router) {}

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }


  isSidebarOpen: boolean = false;

  // Método para abrir y cerrar la barra lateral
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.flagSidebar.emit(this.isSidebarOpen);
  }


  
}
