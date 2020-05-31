import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Company } from "src/app/models/company.model";
import { Project } from "src/app/models/project.model";
import { ProjectCompany } from "src/app/models/project-company.model";

//Services
import { CompanyService } from "src/app/services/company.service";
import { ProjectService } from "src/app/services/project.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-project-company',
  templateUrl: './project-company.page.html',
  styleUrls: ['./project-company.page.scss'],
})
export class ProjectCompanyPage implements OnInit {

  public projects: Array<Project> = [];
  public companies: Array<Company> = [];
  public project_company = new ProjectCompany();

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private projectService: ProjectService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getAllCompanies();
    this.getAllProjects();
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

  async save(){

    if(this.project_company.project_id == 0 && this.project_company.company_id == 0){
      this.messageUtils.showToastError("Select a value.");
      return;
    }

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading
    
    this.projectService.assignCompany(this.project_company).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.project_company = new ProjectCompany();
        this.router.navigate(['/project-list']);
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
