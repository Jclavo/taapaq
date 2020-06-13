import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Role } from "src/app/models/role.model";
import { RolePermission } from "src/app/models/role-permission.model";
import { Permission } from "src/app/models/permission.model";

//Services
import { RoleService } from "src/app/services/role.service";
import { PermissionService } from "src/app/services/permission.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.page.html',
  styleUrls: ['./role-permission.page.scss'],
})
export class RolePermissionPage implements OnInit {

  public role = new Role();
  public permissions: Array<Permission> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.role.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.role.id > 0) {
      this.getRoleById(this.role.id);
      this.getAllPermissionsByRole(this.role.id);
    }
  }

  getRoleById(role_id: number) {
    this.roleService.getById(role_id).subscribe((response: Response) => {
      if (response.status) {
        this.role = response.result;
      }else{
        this.messageUtils.showToastError(response.message);
      }
    },
      error => { this.messageUtils.showToastError(error.message)}
    );
  }

  changePermission(permission_id: number, roleHasPermission: boolean, indexPermission: number) {

    if (roleHasPermission) {
      this.revokePermissionTo(this.role.id, permission_id, indexPermission);
    } else {
      this.givePermissionTo(this.role.id, permission_id, indexPermission);
    }
  }

  async getAllPermissionsByRole(role_id: number) {
    
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading
    
    this.permissionService.getByRole(role_id).subscribe((response: Response) => {
      if (response.status) {
        this.permissions = response.result;
      }else{
        this.messageUtils.showToastError(response.message);
      }
      loading.dismiss();// close loading
    },
      error => { 
        this.messageUtils.showToastError(error.message);
        loading.dismiss();// close loading
      }
    );
  }

  givePermissionTo(role_id: number, permission_id: number, indexPermission: number) {

    this.roleService.givePermissionTo(new RolePermission(role_id, permission_id)).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
      }else{
        this.messageUtils.showToastError(response.message);
        this.permissions[indexPermission].roleHasPermission = !this.permissions[indexPermission].roleHasPermission;
      }
    },
      error => { this.messageUtils.showToastError(error.message)}
    );
  }

  revokePermissionTo(role_id: number, permission_id: number, indexPermission: number) {

    this.roleService.revokePermissionTo(new RolePermission(role_id, permission_id)).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
      }else{
        this.messageUtils.showToastError(response.message);
        this.permissions[indexPermission].roleHasPermission = !this.permissions[indexPermission].roleHasPermission;
      }
    },
      error => { this.messageUtils.showToastError(error.message)}
    );
  }

}
