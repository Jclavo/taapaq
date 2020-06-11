import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { User } from "src/app/models/user.model";
import { UserRole } from 'src/app/models/user-role.mode';
import { Role } from "src/app/models/role.model";
import { Company } from "src/app/models/company.model";
import { Project } from "src/app/models/project.model";
import { ProjectCompany } from "src/app/models/project-company.model";

//Services
import { UserService } from "src/app/services/user.service";
import { RoleService } from "src/app/services/role.service";
import { ProjectService } from "src/app/services/project.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";
import { Utils } from "src/app/utils/utils";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  @ViewChild('selectRoles') selectRolesElement: HTMLIonSelectElement;
  public users: Array<User> = [];
  public usersBackup: Array<User> = [];
  public roles: Array<Role> = [];
  public rolesMissingToUser: Array<Role> = [];
  public projects: Array<Project> = [];
  public companies: Array<Company> = [];
  public project_company = new ProjectCompany();
  private userRole = new UserRole(0,0);
  public searchValue: string = '';

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authUtils: AuthUtils,
    private activatedRoute: ActivatedRoute,
    private messageUtils: MessageUtils,
    private projectService: ProjectService,
  ) { } 

  ngOnInit() {
  }

  ionViewDidEnter(){
   !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.project_company.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.project_company.project_id == 0 ? this.project_company.project_id = this.authUtils.user.project_id : null;

    this.project_company.company_id = Number(this.activatedRoute.snapshot.paramMap.get('company_id'));
    this.project_company.company_id == 0 ? this.project_company.company_id = this.authUtils.user.company_id : null;
    
    this.getAllProjects();
    this.getCompaniesByProject(this.project_company.project_id);
    this.getUserRolesByCompany(this.project_company.project_id, this.project_company.company_id);

  }

  search(){
    if(!this.searchValue){
      this.users = this.usersBackup;
      return;
    }
    this.users.length == 0 ? this.users = this.usersBackup : null;

    this.users = Utils.findValueInCollection(this.users,this.searchValue);
  }

  onChangeProject(){
    this.getCompaniesByProject(this.project_company.project_id);
    this.users = [];
    this.project_company.company_id = 0;
  }

  onChangeCompany(){
    this.getUserRolesByCompany(this.project_company.project_id, this.project_company.company_id);
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

  async getCompaniesByProject(project_id: number) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getCompaniesByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.companies = response.result?.companies;
        if(this.companies.length == 0 ){
          this.messageUtils.showToastOK("Project does not have companies.");
        }
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

  async getUserRolesByCompany(project_id: number,company_id: number){
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading
    
    this.userService.getUserRolesByProjectCompany(project_id, company_id).subscribe((response: Response) => {
      if (response.status) {
        this.users = response.result;
        this.usersBackup = this.users;
      }
      else{
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

  async removeRole(user_id: number, role_id: number){

    if(!await this.messageUtils.showAlertOption('Are you sure to delete the role?')){
      return;
    }

    this.userService.removeRole(new UserRole(user_id,role_id)).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.getUserRolesByCompany(this.project_company.project_id,this.project_company.company_id);
      }else{
        this.messageUtils.showToastError(response.message);
      }
    },
     error => { this.messageUtils.showToastError(error.message)}
    );
    
  }

  openSelectRoles(user_id: number,project_id: number){
    this.userRole = new UserRole(0,0);
    this.userRole.user_id = user_id;

    this.roleService.notInUser(user_id, project_id).subscribe((response: Response) => {
      if (response.status) {
        this.roles = response.result;
        if(this.roles.length > 0){
          this.selectRolesElement.open();
        }
        else{
          this.messageUtils.showToastOK('There are not roles to show.');
        }
      }else{
        this.messageUtils.showToastError(response.message);
      }
    },
     error => { this.messageUtils.showToastError(error.message)}
    );

  }

  assignRole(){
    if(this.userRole.role_id == 0) return; // This validation is when the select is cleaned

    this.userService.assignRole(this.userRole).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.getUserRolesByCompany(this.project_company.project_id, this.project_company.company_id);
      }else{
        this.messageUtils.showToastError(response.message);
      }
      this.selectRolesElement.value = 0;
    },
     error => { this.messageUtils.showToastError(error.message)}
    );
  }

  async delete(id: number, user: string){

    if(!await this.messageUtils.showAlertOption('You are sure to delete the user: ', user)){
      return;
    }

    this.userService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.getUserRolesByCompany(this.project_company.project_id, this.project_company.company_id);
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


  async changeActivatedStatus(user_id: number, index: number){

    if(!await this.messageUtils.showAlertOption('Are you sure to change the activated status?')){
      this.users[index].activated = !this.users[index].activated;
      return;
    }

    this.userService.changeActivatedStatus(user_id).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.getUserRolesByCompany(this.project_company.project_id,this.project_company.company_id);
      }else{
        this.messageUtils.showToastError(response.message);
      }
    },
     error => { this.messageUtils.showToastError(error.message)}
    );
  }

}
