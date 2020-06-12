import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

//Models
import { Response } from "src/app/models/response.model";
import { Module } from 'src/app/models/module.model';
import { User } from "src/app/models/user.model";

//Services
import { ModuleService } from "src/app/services/module.service";

import { MessageUtils } from "src/app/utils/message-utils";

@Injectable({
    providedIn: 'root'
  })
  
export class AuthUtils{

  public isLogged = false;
  public user = new User();
  public modules: Array<Module> = [];

  constructor(private router: Router,
              private menuController: MenuController,
              private moduleService: ModuleService,
              // private messageUtils: MessageUtils
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
    this.getModulesByUser(this.user.id);
  }

  closeSession()
  {
    this.setLoggedIn(false);
    this.menuController.close();
    this.router.navigate(['/login']);
  }

  getModulesByUser(user_id: number){
    // const loading = await this.messageUtils.createLoader();
    // loading.present();// start loading

    this.moduleService.getByUser(user_id).subscribe((response: Response) => {
      if (response.status) {
        this.modules = response.result;
      }
      else {
        // this.messageUtils.showToastError(response.message);
      }
      // loading.dismiss();// close loading
    },
      error => {
        // this.messageUtils.showToastError(error.message);
        // loading.dismiss();// close loading
      }
    );
  }


}