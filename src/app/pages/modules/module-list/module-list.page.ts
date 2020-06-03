import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";
import { Module } from "src/app/models/module.model";

//Services
import { ProjectService } from "src/app/services/project.service";
import { ModuleService } from "src/app/services/module.service";
import { ResourceService } from "src/app/services/resource.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.page.html',
  styleUrls: ['./module-list.page.scss'],
})
export class ModuleListPage implements OnInit {

  public projects: Array<Project> = [];
  public modules: Array<Module> = [];
  public project_id: number = 0;

  constructor(
    private projectService: ProjectService,
    private authUtils: AuthUtils,
    private activatedRoute: ActivatedRoute,
    private messageUtils: MessageUtils,
    private moduleService: ModuleService,
    private resourceService: ResourceService
  ) { }

  ngOnInit() {
  } 

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.project_id == 0 ? this.project_id = this.authUtils.user.project_id : null;
    
    this.getModulesByProject(this.project_id);
    
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

  onChangeProject(){
    this.getModulesByProject(this.project_id);
  }
 
  async getModulesByProject(project_id: number){

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getModulesResourcesByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.modules = response.result?.modules;
        if(this.modules.length == 0){
          this.messageUtils.showToastOK("The current project does not have modules yet.");
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

  async delete(id: number, project: string){

    if(!await this.messageUtils.showAlertOption('You are sure to delete the project: ', project)){
      return;
    }

    this.moduleService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.getModulesByProject(this.project_id);
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

  async deleteResource(id: number, project: string){

    if(!await this.messageUtils.showAlertOption('You are sure to delete the resource: ', project)){
      return;
    }

    this.resourceService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.getModulesByProject(this.project_id);
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
