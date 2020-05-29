import { Component, OnInit } from '@angular/core';

//Models
import { Role } from "src/app/models/role.model";
import { Response } from "src/app/models/response.model";

//Services
import { RoleService } from "src/app/services/role.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.page.html',
  styleUrls: ['./role-list.page.scss'],
})
export class RoleListPage implements OnInit {

  public roles: Array<Role> = [];

  constructor(
    private roleService: RoleService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ngOnInit() {
  } 

  ionViewDidEnter(){
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getAll();
  }

  getAll(){
    this.roleService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.roles = response.result;
      }
      else{
        this.messageUtils.showToastError(response.message);
      }
    },
    error => { this.messageUtils.showToastError(error.message)}
    );
  }

}
