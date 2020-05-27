import { Component, OnInit } from '@angular/core';

//Models
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = new User();

  constructor() { }

  ngOnInit() {
  }

}
