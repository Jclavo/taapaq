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
  selector: 'app-module',
  templateUrl: './module.page.html',
  styleUrls: ['./module.page.scss'],
})
export class ModulePage implements OnInit {

  public projects: Array<Project> = [];
  public module = new Module();
  public project_id: string = "0";

  constructor(
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private moduleService: ModuleService,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
  
    this.module.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.getAllProjects();
  }

  async getAllProjects() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.projects = response.result;

        this.module.project_id > 0 ? this.project_id = this.module.project_id.toString() : null;
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

    if(this.project_id == "0"){
      this.messageUtils.showToastError("Select a project.");
      return;
    }

    this.module.project_id = Number(this.project_id);
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
        this.messageUtils.showToastOK(response.message);
        this.module = new Module(); // clean model
        this.router.navigate(['/module-list',this.project_id]);
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
