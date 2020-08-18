import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleLabelPageRoutingModule } from './module-label-routing.module';

import { ModuleLabelPage } from './module-label.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleLabelPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [ModuleLabelPage]
})
export class ModuleLabelPageModule {}
