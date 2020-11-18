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

  private KEY_USER_STORAGE = 'A1-USER';
  private KEY_USER_MODULES_STORAGE = 'A1-MODULES';

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

    if(this.user?.id <= 0){
      //get user from local storage
      this.user  = JSON.parse(localStorage.getItem(this.KEY_USER_STORAGE));
      if(this.user == null){
        this.user = new User();
      }

      //get modules from local storage
      this.modules  = JSON.parse(localStorage.getItem(this.KEY_USER_MODULES_STORAGE));
      if(this.modules == null){
        this.modules = [];
      }
    }

    if(this.user.token == null){
      this.setLoggedIn(false);
    }else{
      this.setLoggedIn(true);
    }
    return this.isLogged;
    // return true;
  }

  setUser(_user: User)
  {
    this.user = _user;
    localStorage.setItem(this.KEY_USER_STORAGE, JSON.stringify(this.user));
  }

  setModules(_modules: Array<Module>)
  {
    this.modules = _modules;
    localStorage.setItem(this.KEY_USER_MODULES_STORAGE, JSON.stringify(this.modules));
  }

  closeSession()
  {
    this.setLoggedIn(false);
    localStorage.removeItem(this.KEY_USER_STORAGE);
    localStorage.removeItem(this.KEY_USER_MODULES_STORAGE);
    this.menuController.close();
    this.router.navigate(['/login']);
  }

  getHeaders(){
    return {
      headers: new HttpHeaders({
        // 'Authorization': 'Bearer ' + this.getAPITOKEN()
        'Authorization': 'Bearer ' + this.user.token
        // 'Authorization': 'Bearer ' + 'w1PCDNnUC9qB7ASLL2v3hMeEOdXsGYSV5hXE2BJLchORTOxXaRBdb3HPkf81mdmXB281fD5EroMiHyiE'
      })
    };
  }

}