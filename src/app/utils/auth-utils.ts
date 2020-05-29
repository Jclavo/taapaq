import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//Models
import { User } from "src/app/models/user.model";

@Injectable({
    providedIn: 'root'
  })
  
export class AuthUtils{

  public isLogged = false;
  public user = new User();

  constructor(private router: Router) {}

   setLoggedIn(_value) {
    this.isLogged = _value;
  }

  isAuthenticated(): boolean {
    return this.isLogged;
    // return true;
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