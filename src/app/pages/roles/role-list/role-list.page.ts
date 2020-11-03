import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Role } from "src/app/models/role.model";
import { Project } from "src/app/models/project.model";
import { Company } from "src/app/models/company.model";

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
  public rolesBackup: Array<Role> = [];
  public searchValue: string = '';
  public companies: Array<Company> = [];

  public project_id: number = 0;
  public company_id: number = 0;

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

    this.company_id = Number(this.activatedRoute.snapshot.paramMap.get('company_id'));
    this.company_id == 0 ? this.company_id = this.authUtils.user.company_id : null;

    this.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.project_id == 0 ? this.project_id = this.authUtils.user.project_id : null;

    this.getAllProjects();
    this.getCompaniesByProject(this.project_id);

    if(this.company_id > 0){
      this.getByCompanyProject(this.company_id, this.project_id);
    }
  }

  onChangeProject(){
    this.getCompaniesByProject(this.project_id);
  }

  onChangeCompany(){
    this.getByCompanyProject(this.company_id, this.project_id);
  }

  search(){
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
        this.authUtils.user.isSuper ? this.messageUtils.showToastError(response.message) : console.log(response.message);
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
        if (this.companies.length == 0) {
          this.messageUtils.showToastOK("Project does not have companies.");
        }
      }
      else {
        this.authUtils.user.isSuper ? this.messageUtils.showToastError(response.message) : console.log(response.message);
      }
      loading.dismiss();// close loading
    },
      error => {
        this.messageUtils.showToastError(error.message);
        loading.dismiss();// close loading
      }
    );
  }

  async getByCompanyProject(company_id: number,project_id: number) {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.roleService.getByCompanyProject(company_id, project_id).subscribe((response: Response) => {
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
        this.getByCompanyProject(this.company_id,this.project_id);
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
