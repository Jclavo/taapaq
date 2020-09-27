import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslationDetailPageRoutingModule } from './translation-detail-routing.module';

import { TranslationDetailPage } from './translation-detail.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslationDetailPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [TranslationDetailPage]
})
export class TranslationDetailPageModule {}
