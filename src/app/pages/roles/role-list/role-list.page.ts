import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Role } from "src/app/models/role.model";
import { Project } from "src/app/models/project.model";

//Services
import { RoleService } from "src/app/services/role.service";
import { ProjectService } from "src/app/services/project.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";
import { Utils } from "src/app/utils/utils";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.page.html',
  styleUrls: ['./role-list.page.scss'],
})
export class RoleListPage implements OnInit {

  public roles: Array<Role> = [];
  public projects: Array<Project> = [];
  public project_id: number = 0;
  public rolesBackup: Array<Role> = [];
  public searchValue: string = '';

  constructor(
    private roleService: RoleService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.project_id == 0 ? this.project_id = this.authUtils.user.project_id : null;

    this.getAllProjects();
    this.getByProject(this.project_id);
    
  }

  onChangeProject(){
    this.getByProject(this.project_id);
  }

  search(){
    console.log(this.searchValue);
    if(!this.searchValue){
      this.roles = this.rolesBackup;
      return;
    }
    
    this.roles.length == 0 ? this.roles = this.rolesBackup : null;

    // this.roles = this.roles.filter(value => value.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
    this.roles = Utils.findValueInCollection(this.roles,this.searchValue);
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

  async getByProject(project_id: number) {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.roleService.getByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.roles = response.result;
        this.rolesBackup = this.roles;
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

  async delete(id: number, role: string){

    if(!await this.messageUtils.showAlertOption('You are sure to delete the role: ', role)){
      return;
    }

    this.roleService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.getByProject(this.project_id);
      }
      else {
        this.messageUtils.showToastError(response.message);
      }
    },
      error => {
        this.messageUtils.showToastError(error.message);
      }
    );

  }

}
