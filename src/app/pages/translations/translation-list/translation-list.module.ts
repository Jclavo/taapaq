import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslationListPageRoutingModule } from './translation-list-routing.module';

import { TranslationListPage } from './translation-list.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslationListPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [TranslationListPage]
})
export class TranslationListPageModule {}
