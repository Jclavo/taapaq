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
    private authUtils: AuthUtils
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    this.authUtils.setLoggedIn(false);
  }

  login() {
    console.log(this.user);
    this.userService.getAll().subscribe((response: Response) => {
      console.log(response.message);
      if (response.status) {
        // console.log('logged');
        this.authUtils.setLoggedIn(true);
        this.authUtils.setUser(response.result);
        this.router.navigate(['/user-list']);
      }
    },
      error => { console.log('Received an error') }
    );
  }

}
