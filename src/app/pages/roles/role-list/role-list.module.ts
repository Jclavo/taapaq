import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleListPageRoutingModule } from './role-list-routing.module';

import { RoleListPage } from './role-list.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleListPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [RoleListPage]
})
export class RoleListPageModule {}
