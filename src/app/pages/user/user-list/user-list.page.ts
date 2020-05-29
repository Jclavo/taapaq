import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Models
import { Response } from "src/app/models/response.model";
import { User } from "src/app/models/user.model";
import { UserRole } from 'src/app/models/user-role.mode';
import { Role } from "src/app/models/role.model";

//Services
import { UserService } from "src/app/services/user.service";
import { RoleService } from "src/app/services/role.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  @ViewChild('selectRoles') selectRolesElement: HTMLIonSelectElement;
  public users: Array<User> = [];
  public roles: Array<Role> = [];
  public rolesMissingToUser: Array<Role> = [];
  private userRole = new UserRole(0,0);


  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
   !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getAllWithRoles();
  }

  getAllWithRoles(){
    this.userService.getAllWithRoles().subscribe((response: Response) => {
      if (response.status) {
        this.users = response.result;
      }
      else{
        this.messageUtils.showToastError(response.message);
      }
    },
     error => { this.messageUtils.showToastError(error.message)}
    );
  }

  async removeRole(user_id: number, role_id: number){

    if(!await this.messageUtils.showAlertOption('Are you sure to delete the role?')){
      return;
    }

    this.userService.removeRole(new UserRole(user_id,role_id)).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.getAllWithRoles();
      }else{
        this.messageUtils.showToastError(response.message);
      }
    },
     error => { this.messageUtils.showToastError(error.message)}
    );
    
  }

  openSelectRoles(user_id: number){
    this.userRole = new UserRole(0,0);
    this.userRole.user_id = user_id;

    this.roleService.missingToUser(user_id).subscribe((response: Response) => {
      if (response.status) {
        this.roles = response.result;
        if(this.roles.length > 0){
          this.selectRolesElement.open();
        }
        else{
          this.messageUtils.showToastOK('User has all the roles.');
        }
      }else{
        this.messageUtils.showToastError(response.message);
      }
      // this.selectRolesElement.value = 0;
    },
     error => { this.messageUtils.showToastError(error.message)}
    );

  }

  assignRole(){
    if(this.userRole.role_id == 0) return; // This validation is when the select is cleaned

    this.userService.assignRole(this.userRole).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.getAllWithRoles();
      }else{
        this.messageUtils.showToastError(response.message);
      }
      this.selectRolesElement.value = 0;
    },
     error => { this.messageUtils.showToastError(error.message)}
    );
    
  }

}
