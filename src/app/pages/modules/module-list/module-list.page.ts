import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";
import { Module } from "src/app/models/module.model";

//Services
import { ProjectService } from "src/app/services/project.service";
import { ModuleService } from "src/app/services/module.service";

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
  public project = new Project();
  public modules: Array<Module> = [];
  public project_id: string = "0";

  constructor(
    private projectService: ProjectService,
    private authUtils: AuthUtils,
    private activatedRoute: ActivatedRoute,
    private messageUtils: MessageUtils,
    private moduleService: ModuleService
  ) { }

  ngOnInit() {
  } 

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.project.id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.project.id > 0 ? this.getModulesByProject(this.project.id) : null;
    
    this.getAllProjects();
  }

  async getAllProjects() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.projects = response.result;
        this.project.id > 0 ? this.project_id = this.project.id.toString() : null;
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

  getModules(event){
    this.project.id = event.target.value;
    this.getModulesByProject(this.project.id);
  }
 
  async getModulesByProject(project_id: number){

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getModulesResourcesByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.project = response.result;
        if(this.project.modules.length == 0){
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
        this.getModulesByProject(this.project.id);
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
