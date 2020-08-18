import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Module } from "src/app/models/module.model";
import { Project } from "src/app/models/project.model";

//Services
import { ProjectService } from "src/app/services/project.service";
import { ModuleService } from "src/app/services/module.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-module-label',
  templateUrl: './module-label.page.html',
  styleUrls: ['./module-label.page.scss'],
})
export class ModuleLabelPage implements OnInit {

  public projects: Array<Project> = [];
  public module = new Module();
  public modules: Array<Module> = [];

  constructor(
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private moduleService: ModuleService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.module.labeled = true;
    this.module.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.getAllProjects();
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


}
