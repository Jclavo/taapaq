import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//Models
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged = false;
  public  user = new User();

  constructor(private router: Router) {}

  setLoggedIn(_value) {
    this.isLogged = _value;
  }
  isAuthenticated(): boolean {
    return this.isLogged;
  }

  setUser(_user: User)
  {
    this.user = _user;
  }

  closeSession()
  {
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
