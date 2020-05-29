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

  login() {
    console.log(this.user);
    this.userService.login(this.user).subscribe((response: Response) => {
      console.log(response.message);
     
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.authUtils.setLoggedIn(true);
        this.authUtils.setUser(response.result);
        this.router.navigate(['/user-list']);
      }else{
        this.messageUtils.showToastError(response.message);
      }
    },
      error => { this.messageUtils.showToastError('Received an error')}
    );
  }

}
