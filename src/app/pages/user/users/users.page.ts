import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { User } from "src/app/models/user.model";
import { Company } from "src/app/models/company.model";
import { Project } from "src/app/models/project.model";

//Services
import { UserService } from "src/app/services/user.service";
import { CompanyService } from "src/app/services/company.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public projects: Array<Project> = [];
  public companies: Array<Company> = [];
  public user = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
  
    this.getAllCompanies();
    // this.getAllProjects();
  }

  async getAllCompanies() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.companyService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.companies = response.result;
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

  getProjects(){
    this.getProjectByCompany(this.user.company_id);
  }

  async getProjectByCompany(company_id: number) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.companyService.getProjectByCompany(company_id).subscribe((response: Response) => {
      if (response.status) {
        if(response.result.projects?.length > 0){
          this.projects = response.result.projects;
        }else{
          this.projects = [];
          this.messageUtils.showToastError("There are not projects for the company.");
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

  save(){

    if(this.user.company_id == undefined || this.user.project_id == undefined){
      this.messageUtils.showToastError("Select a value.");
      return;
    }

    if(this.user.id > 0){
      //update
    }else{
      this.create(this.user);
    }

  }

  async create(user: User){
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading
    
    this.userService.create(user).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.router.navigate(['/user-list']);
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
