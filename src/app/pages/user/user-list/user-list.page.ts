import { Component, OnInit } from '@angular/core';

//Models
import { User } from "src/app/models/user.model";
import { Response } from "src/app/models/response.model";

//Services
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  private users: Array<User> = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getAll();
  }

  getAll(){
    this.userService.getAll().subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        // console.log('logged');
        this.users = data.result;
      }
    },
      error => { console.log('Received an error') }
    );
  }

}
