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
    private roleService: RoleService
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.role.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.role.id > 0) {
      this.getRoleById(this.role.id);
      this.getAllPermissionsByRole(this.role.id);
    }
  }

  getRoleById(role_id: number) {
    this.roleService.getById(role_id).subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        this.role = data.result;
      }
    },
      error => { console.log('Received an error') }
    );
  }

  changePermission(permission_id: number, roleHasPermission: boolean) {

    console.log(roleHasPermission);
    if (roleHasPermission) {
      this.revokePermissionTo(this.role.id, permission_id);
    } else {
      this.givePermissionTo(this.role.id, permission_id);
    }
  }

  getAllPermissionsByRole(role_id: number) {
    this.permissionService.getAllPermissionsByRole(role_id).subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        this.permissions = data.result;
      }
    },
      error => { console.log('Received an error') }
    );
  }

  givePermissionTo(role_id: number, permission_id: number) {

    this.roleService.givePermissionTo(new RolePermission(role_id, permission_id)).subscribe((data: Response) => {
      console.log(data.message);
    },
      error => { console.log('Received an error') }
    );
  }

  revokePermissionTo(role_id: number, permission_id: number) {

    this.roleService.revokePermissionTo(new RolePermission(role_id, permission_id)).subscribe((data: Response) => {
      console.log(data.message);
    },
      error => { console.log('Received an error') }
    );
  }

}
