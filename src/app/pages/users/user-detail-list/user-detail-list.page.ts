import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { UserDetail } from "src/app/models/user-detail";

//Services
import { UserDetailService } from "src/app/services/user-detail.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";
import { Utils } from "src/app/utils/utils";

@Component({
  selector: 'app-user-detail-list',
  templateUrl: './user-detail-list.page.html',
  styleUrls: ['./user-detail-list.page.scss'],
})
export class UserDetailListPage implements OnInit {

  public users: Array<UserDetail> = [];
  public usersBackup: Array<UserDetail> = [];
  public searchValue: string = '';

  constructor(
    private userDetailService: UserDetailService,
    private authUtils: AuthUtils,
    private activatedRoute: ActivatedRoute,
    private messageUtils: MessageUtils
  ) { } 

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getAllUsers();
  }

  async getAllUsers() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.userDetailService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.users = response.result;
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
