import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Role } from "src/app/models/role.model";
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";

//Services
import { RoleService } from "src/app/services/role.service";
import { ProjectService } from "src/app/services/project.service";

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
  public projects: Array<Project> = [];

  constructor(
    private roleService: RoleService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) { }
 
  ngOnInit() {
  }

  ionViewDidEnter(){
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
    
    this.role.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));  // assigned project
    this.getAllProjects();
  }

  async getAllProjects() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.projects = response.result;
      }
      else {
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

  save(){

    if(this.role.project_id == 0){
      this.messageUtils.showToastError("Select a value.");
      return;
    }

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
        this.router.navigate(['/role-list',this.role.project_id]);
        this.role = new Role(); // clean model
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
