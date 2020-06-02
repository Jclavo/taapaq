import { Component, OnInit } from '@angular/core';

//Models
import { Role } from "src/app/models/role.model";
import { Response } from "src/app/models/response.model";

//Services
import { RoleService } from "src/app/services/role.service";
import { ProjectService } from "src/app/services/project.service";

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
    private messageUtils: MessageUtils,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getRolesByProject(this.authUtils.user.project_id);
  }

  async getRolesByProject(project_id: number) {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getRolesByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.roles = response.result?.roles;
      }
      else {
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

  async delete(id: number, role: string){

    if(!await this.messageUtils.showAlertOption('You are sure to delete the role: ', role)){
      return;
    }

    this.roleService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.getRolesByProject(this.authUtils.user.project_id);
      }
      else {
        this.messageUtils.showToastError(response.message);
      }
    },
      error => {
        this.messageUtils.showToastError(error.message);
      }
    );

  }

}
