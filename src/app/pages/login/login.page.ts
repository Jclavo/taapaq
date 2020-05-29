import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { User } from 'src/app/models/user.model';
import { Response } from "src/app/models/response.model";

//Services
import { UserService } from "src/app/services/user.service";
//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = new User();
  public appName = environment.appName;

  constructor(
    private router: Router,
    private userService: UserService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    this.authUtils.setLoggedIn(false);
  }

  async login() {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.userService.login(this.user).subscribe((response: Response) => {     
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.authUtils.setLoggedIn(true);
        this.authUtils.setUser(response.result);
        this.router.navigate(['/user-list']);
      }
      else{
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
