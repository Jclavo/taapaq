import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { TranslationDetail } from "src/app/models/translation-detail.model";
import { Locale } from "src/app/models/locale.model";

//Services
import { TranslationDetailService } from "src/app/services/translation-detail.service";
import { TranslationService } from "src/app/services/translation.service";
import { LocaleService } from "src/app/services/locale.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-translation-detail',
  templateUrl: './translation-detail.page.html',
  styleUrls: ['./translation-detail.page.scss'],
})
export class TranslationDetailPage implements OnInit {

  public locales: Array<Locale> = [];
  public translations:  Array<TranslationService> = [];
  public translationDetail = new TranslationDetail();

  public project_id: number = 0;
  public model_id: number = 0;

  constructor(
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translationDetailService: TranslationDetailService,
    private translationService: TranslationService,
    private localeService: LocaleService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id')) ?? 0;
    this.model_id = Number(this.activatedRoute.snapshot.paramMap.get('model_id')) ?? 0;

    this.translationDetail.translation_id = Number(this.activatedRoute.snapshot.paramMap.get('translation_id')) ?? 0;

    this.getLocales();
    this.getTranslationsByModel(this.model_id);
  }

  async getLocales() {

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.localeService.get().subscribe((response: Response) => {
      if (response.status) {
        this.locales = response.result;
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

    if (!this.translationDetail.locale) {
      this.messageUtils.showToastError("Select a language.");
      return;
    }

    if (this.translationDetail.id > 0) {
      //update
    } else {
      this.create(this.translationDetail);
    }
  }

  async create(translationDetail: TranslationDetail) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.translationDetailService.create(translationDetail).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.router.navigate(['/translation-list', this.project_id,this.model_id]);
        this.translationDetail = new TranslationDetail(); // clean model
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
