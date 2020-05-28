import { Component, OnInit } from '@angular/core';

//Models
import { Role } from "src/app/models/role.model";
import { Response } from "src/app/models/response.model";

//Services
import { RoleService } from "src/app/services/role.service";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.page.html',
  styleUrls: ['./role-list.page.scss'],
})
export class RoleListPage implements OnInit {

  public roles: Array<Role> = [];

  constructor(private roleService: RoleService) { }

  ngOnInit() {
  } 

  ionViewDidEnter(){
    this.getAll();
  }

  getAll(){
    this.roleService.getAll().subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        // console.log('logged');
        this.roles = data.result;
      }
    },
      error => { console.log('Received an error') }
    );
  }

}
