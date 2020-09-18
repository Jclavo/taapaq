import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelListPageRoutingModule } from './model-list-routing.module';

import { ModelListPage } from './model-list.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelListPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [ModelListPage]
})
export class ModelListPageModule {}
