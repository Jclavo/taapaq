import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { User } from "src/app/models/user.model";
import { Response } from "src/app/models/response.model";

//Services
import { UserService } from "src/app/services/user.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public user = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
  }

  save(){

    if(this.user.id > 0){
      //update
    }else{
      this.create(this.user);
    }

  }

  async create(user: User){
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading
    
    this.userService.create(user).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.router.navigate(['/user-list']);
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
 
}
