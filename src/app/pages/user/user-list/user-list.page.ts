import { Component, OnInit } from '@angular/core';

//Models
import { User } from "src/app/models/user.model";
import { Response } from "src/app/models/response.model";

//Services
import { UserService } from "src/app/services/user.service";
import { UserRole } from 'src/app/models/user-role.mode';

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
    this.getAllWithRoles();
  }

  getAllWithRoles(){
    this.userService.getAllWithRoles().subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        this.users = data.result;
      }
    },
      error => { console.log('Received an error') }
    );
  }

  removeRole(user_id: number, role_id: number){
    this.userService.removeRole(new UserRole(user_id,role_id)).subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        this.getAllWithRoles();
      }
    },
      error => { console.log('Received an error') }
    );
    
  }

  addRole(){
    console.log('add');
  }

}
