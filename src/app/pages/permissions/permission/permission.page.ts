import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Permission } from "src/app/models/permission.model";
import { Response } from "src/app/models/response.model";

//Services
import { PermissionService } from "src/app/services/permission.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-permission',
  templateUrl: './permission.page.html',
  styleUrls: ['./permission.page.scss'],
})
export class PermissionPage implements OnInit {

  public permission = new Permission();

  constructor(
    private permissionService: PermissionService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
  }

  save() {

    if (this.permission.id > 0) {
      //update
    } else {
      this.create(this.permission);
    }
  }

  async create(permission: Permission) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.permissionService.create(permission).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.permission = new Permission(); // clean model
        this.router.navigate(['/permission-list']);
      } else {
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
