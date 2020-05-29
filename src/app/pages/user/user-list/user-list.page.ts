import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Models
import { Response } from "src/app/models/response.model";
import { User } from "src/app/models/user.model";
import { UserRole } from 'src/app/models/user-role.mode';
import { Role } from "src/app/models/role.model";

//Services
import { UserService } from "src/app/services/user.service";
import { RoleService } from "src/app/services/role.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  @ViewChild('selectRoles') selectRolesElement: HTMLIonSelectElement;
  public users: Array<User> = [];
  public roles: Array<Role> = [];
  public rolesMissingToUser: Array<Role> = [];
  // private user_id: number = 0;
  // private user
  private userRole = new UserRole(0,0);


  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    // this. getAllRoles();
    this.getAllWithRoles();
  }

  // getAllRoles(){
  //   this.roleService.getAll().subscribe((data: Response) => {
  //     console.log(data.message);
  //     if (data.status) {
  //       this.roles = data.result;
  //     }
  //   },
  //     error => { console.log('Received an error') }
  //   );
  // }

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

  openSelectRoles(user_id: number){
    this.userRole = new UserRole(0,0);
    this.userRole.user_id = user_id;

    this.roleService.missingToUser(user_id).subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        this.roles = data.result;
        if(this.roles.length > 0){
          this.selectRolesElement.open();
        }
        else{
          console.log('User has all the roles');
        }
      }
      this.selectRolesElement.value = 0;
    },
      error => { console.log('Received an error') }
    );


    // this.selectRolesElement.open();
  }

  assignRole(){
    if(this.userRole.role_id == 0) return; // This validation is when the select is cleaned

    this.userService.assignRole(this.userRole).subscribe((data: Response) => {
      console.log(data.message);
      if (data.status) {
        this.getAllWithRoles();
      }
      this.selectRolesElement.value = 0;
    },
      error => { console.log('Received an error') }
    );
    
  }



}
