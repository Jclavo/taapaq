import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";
import { Translation } from "src/app/models/translation.model";
import { Model } from "src/app/models/model.model";
// import { TranslationDetail } from "src/app/models/translation-detail.model";

//Services
import { ProjectService } from "src/app/services/project.service";
import { TranslationService } from "src/app/services/translation.service";
import { ModelService } from "src/app/services/model.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";
import { Utils } from "src/app/utils/utils";

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.page.html',
  styleUrls: ['./translation-list.page.scss'],
})
export class TranslationListPage implements OnInit {

  public projects: Array<Project> = [];
  public translations: Array<Translation> = [];
  public translationsBackup: Array<Translation> = [];
  public models: Array<Model> = [];

  public project_id: number = 0;
  public model_id: number = 0;
  public searchValue: string = '';

  constructor(
    private projectService: ProjectService,
    private authUtils: AuthUtils,
    private activatedRoute: ActivatedRoute,
    private messageUtils: MessageUtils,
    private translationService: TranslationService,
    private modelService: ModelService
  ) { }

  ngOnInit() {}

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.project_id == 0 ? this.project_id = this.authUtils.user.project_id : null;
    this.model_id = Number(this.activatedRoute.snapshot.paramMap.get('model_id')) ?? 0;

    this.getAllProjects();

    this.getModelByProject(this.project_id);
    this.getTranslationsByProject(this.project_id);

    this.model_id > 0 ? this.getTranslationsByModel(this.model_id) : null;

  }

  onChangeProject() {
    this.getModelByProject(this.project_id);
    this.getTranslationsByProject(this.project_id);
  }

  onChangeModel() {
    this.getTranslationsByModel(this.model_id);
  }


  search() {
    if (!this.searchValue) {
      this.translations = [];
      this.translations = Utils.copyDeeperObject(this.translationsBackup);
      return;
    }
    this.translations.length == 0 ? this.translations = Utils.copyDeeperObject(this.translationsBackup) : null;

    this.translations = Utils.findValueInCollection(this.translations, this.searchValue);
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

  async getTranslationsByProject(project_id: number) {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.translationService.getByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.translations = response.result;
        this.translationsBackup = Utils.copyDeeperObject(this.translations);
        if (this.translations.length == 0) {
          this.messageUtils.showToastOK("The current project does not have translations yet.");
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

  async getTranslationsByModel(model_id: number) {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.translationService.getByModel(model_id).subscribe((response: Response) => {
      if (response.status) {
        this.translations = response.result;
        this.translationsBackup = Utils.copyDeeperObject(this.translations);
        if (this.translations.length == 0) {
          this.messageUtils.showToastOK("The current model does not have translations yet.");
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

  async getModelByProject(project_id: number) {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.modelService.getByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.models = response.result;
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

  async delete(id: number, project: string) {

    if (!await this.messageUtils.showAlertOption('You are sure to delete the project: ', project)) {
      return;
    }

    this.translationService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.getTranslationsByProject(this.project_id);
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
