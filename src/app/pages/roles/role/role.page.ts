import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Role } from "src/app/models/role.model";
import { Response } from "src/app/models/response.model";

//Services
import { RoleService } from "src/app/services/role.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-role',
  templateUrl: './role.page.html',
  styleUrls: ['./role.page.scss'],
})
export class RolePage implements OnInit {

  public role = new Role();

  constructor(
    private roleService: RoleService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router
  ) { }
 
  ngOnInit() {
  }

  ionViewDidEnter(){
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
  }

  save(form){

    if(this.role.id > 0){
      //update
    }else{
      this.create(this.role);
    }
  }

  async create(role: Role){
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading
    
    this.roleService.create(role).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.role = new Role(); // clean model
        this.router.navigate(['/role-list']);
      }else{
        this.messageUtils.showToastError(response.message);
      }
      loading.dismiss();// close loading
    },
      error => { 
        this.messageUtils.showToastError(error.message);
        loading.dismiss();// close loading
      }
    );
  }

}
