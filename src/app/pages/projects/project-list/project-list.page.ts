import { Component, OnInit } from '@angular/core';

//Models
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";

//Services
import { ProjectService } from "src/app/services/project.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
})
export class ProjectListPage implements OnInit {

  public projects: Array<Project> = [];

  constructor(
    private projectService: ProjectService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ngOnInit() {
  } 

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getAll();
  }

  async getAll() {
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

  async delete(id: number, project: string){

    if(!await this.messageUtils.showAlertOption('You are sure to delete the project: ', project)){
      return;
    }

    this.projectService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.getAll();
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
