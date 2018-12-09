import { Observable } from 'rxjs';
import { AuthService } from './../auth/services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bs-navmenu',
  templateUrl: './bs-navmenu.component.html',
  styleUrls: ['./bs-navmenu.component.css']
})
export class BsNavmenuComponent implements OnInit {
  userName$: Observable<string>;
  constructor(private authService: AuthService) {
   }
  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }


}
