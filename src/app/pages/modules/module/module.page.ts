import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Module } from "src/app/models/module.model";
import { Project } from "src/app/models/project.model";
import { Resource } from 'src/app/models/resource.model';

//Services
import { ProjectService } from "src/app/services/project.service";
import { ModuleService } from "src/app/services/module.service";
import { ResourceCommonService } from "src/app/services/resource-common.service";
import { ResourceService } from "src/app/services/resource.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-module',
  templateUrl: './module.page.html',
  styleUrls: ['./module.page.scss'],
})
export class ModulePage implements OnInit {

  public projects: Array<Project> = [];
  public resourcesCommons: Array<Resource> = [];
  public module = new Module();
  public modules: Array<Module> = [];

  constructor(
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private moduleService: ModuleService,
    private projectService: ProjectService,
    private resourceCommonService: ResourceCommonService,
    private resourceService: ResourceService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.module.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.getAllProjects();
    this.getAlResourcesCommons();
    this.getLabelsByProject(this.module.project_id);
  }

  onChangeProject(){
    this.getLabelsByProject(this.module.project_id);
  }

  async getLabelsByProject(project_id: number){

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.moduleService.getLabelsByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.modules = response.result;
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

  async getAlResourcesCommons() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.resourceCommonService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.resourcesCommons = response.result;
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



  save() {

    if (this.module.project_id == 0) {
      this.messageUtils.showToastError("Select a project.");
      return;
    }

    if (this.module.id > 0) {
      //update
    } else {
      this.create(this.module);
    }
  }

  async create(module: Module) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.moduleService.create(module).subscribe((response: Response) => {
      if (response.status) {
        this.module = response.result;
        this.createResourceCommons(this.module.id);

        this.messageUtils.showToastOK(response.message);
        this.router.navigate(['/module-list', this.module.project_id]);
        this.module = new Module(); // clean model
      } else {
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

  createResourceCommons(module_id: number) {

    for (let index = 0; index < this.resourcesCommons.length; index++) {
      this.resourcesCommons[index].module_id = module_id;
      if (this.resourcesCommons[index].isChecked) {
        this.createResource(this.resourcesCommons[index]);
      }
    }

  }

  createResource(resource: Resource) {
    this.resourceService.create(resource).subscribe((response: Response) => {
      if (response.status) {
        // this.messageUtils.showToastOK(response.message);
      } else {
        this.messageUtils.showToastError(response.message);
      }
    },
      error => {
        this.messageUtils.showToastError(error.message);
      }
    );
  }


}
