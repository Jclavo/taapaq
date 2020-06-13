import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

//Models
import { Module } from 'src/app/models/module.model';
import { User } from "src/app/models/user.model";

@Injectable({
    providedIn: 'root'
  })
  
export class AuthUtils{

  public isLogged = false;
  public user = new User();
  public modules: Array<Module> = [];

  constructor(private router: Router,
              private menuController: MenuController
  ){}

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
    this.menuController.close();
    this.router.navigate(['/login']);
  }

  getHeaders(){
    return {
      headers: new HttpHeaders({
        // 'Authorization': 'Bearer ' + this.getAPITOKEN()
        'Authorization': 'Bearer ' + this.user.token
      })
    };
  }

}