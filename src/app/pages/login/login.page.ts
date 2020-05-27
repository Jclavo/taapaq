import { Component, OnInit } from '@angular/core';

//Models
import { User } from 'src/app/models/user.model';
import { Response } from "src/app/models/response.model";

//Services
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    this.userService.login(this.user).subscribe((data: Response) => {

      console.log(data.message);
      if (data.status) {
        // console.log('logged');
      }
    },
      error => { console.log('Received an error') }
    );
  }

}
