import { Component, OnInit } from '@angular/core';

//Models
import { Permission } from "src/app/models/permission.model";
import { Response } from "src/app/models/response.model";

//Services
import { PermissionService } from "src/app/services/permission.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.page.html',
  styleUrls: ['./permission-list.page.scss'],
})
export class PermissionListPage{

  public permissions: Array<Permission> = [];

  constructor(
    private permissionService: PermissionService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getAll();
  }

  async getAll() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.permissionService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.permissions = response.result;
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

}
