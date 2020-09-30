import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Model } from "src/app/models/model.model";
import { Translation } from "src/app/models/translation.model";

//Services
import { ModelService } from "src/app/services/model.service";
import { TranslationService } from "src/app/services/translation.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-translation',
  templateUrl: './translation.page.html',
  styleUrls: ['./translation.page.scss'],
})
export class TranslationPage implements OnInit {

  public models: Array<Model> = [];
  public translation = new Translation();
  public project_id : number = 0;



  constructor(
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modelService: ModelService,
    private translationService: TranslationService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getModelByProject(this.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id')));
    this.translation.model_id = Number(this.activatedRoute.snapshot.paramMap.get('model_id')) ?? 0;

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

  save() {

    if (this.translation.model_id == 0) {
      this.messageUtils.showToastError("Select a model.");
      return;
    }

    if (this.translation.id > 0) {
      //update
    } else {
      this.create(this.translation);
    }
  }

  async create(translation: Translation) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.translationService.create(translation).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.router.navigate(['/translation-list', this.project_id,this.translation.model_id]);
        this.translation = new Translation(); // clean model
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
