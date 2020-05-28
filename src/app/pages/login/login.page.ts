import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { User } from 'src/app/models/user.model';
import { Response } from "src/app/models/response.model";

//Services
import { UserService } from "src/app/services/user.service";

//Env
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = new User();
  public appName = environment.appName;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    this.userService.getAll().subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        // console.log('logged');
        this.router.navigate(['/user-list']);
      }
    },
      error => { console.log('Received an error') }
    );
  }

}
