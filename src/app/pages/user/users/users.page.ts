import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { User } from "src/app/models/user.model";
import { Response } from "src/app/models/response.model";

//Services
import { UserService } from "src/app/services/user.service";


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
  ) { }

  ngOnInit() {
  }

  save(){

    if(this.user.id > 0){
      //update
    }else{
      this.create(this.user);
    }

  }

  create(user: User){
    this.userService.create(user).subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        this.router.navigate(['/user-list']);
      }
    },
      error => { console.log('Received an error') }
    );
  }
 
}
