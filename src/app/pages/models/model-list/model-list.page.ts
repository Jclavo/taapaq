import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Model } from "src/app/models/model.model";
import { Project } from "src/app/models/project.model";

//Services
import { ModelService } from "src/app/services/model.service";
import { ProjectService } from "src/app/services/project.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";
import { Utils } from "src/app/utils/utils";


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.page.html',
  styleUrls: ['./model-list.page.scss'],
})
export class ModelListPage implements OnInit {

  public models: Array<Model> = [];
  public projects: Array<Project> = [];
  public project_id: number = 0;
  public rolesBackup: Array<Model> = [];
  public searchValue: string = '';

  constructor(
    private modelService: ModelService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.project_id == 0 ? this.project_id = this.authUtils.user.project_id : null;

    this.getAllProjects();
    this.getByProject(this.project_id);
    
  }

  onChangeProject(){
    this.getByProject(this.project_id);
  }

  search(){
    console.log(this.searchValue);
    if(!this.searchValue){
      this.models = this.rolesBackup;
      return;
    }
    
    this.models.length == 0 ? this.models = this.rolesBackup : null;

    // this.models = this.models.filter(value => value.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
    this.models = Utils.findValueInCollection(this.models,this.searchValue);
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

  async getByProject(project_id: number) {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.modelService.getByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.models = response.result;
        this.rolesBackup = this.models;
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

  async delete(id: number, Model: string){

    if(!await this.messageUtils.showAlertOption('You are sure to delete the Model: ', Model)){
      return;
    }

    this.modelService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.getByProject(this.project_id);
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
