import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDetailListPageRoutingModule } from './user-detail-list-routing.module';

import { UserDetailListPage } from './user-detail-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDetailListPageRoutingModule
  ],
  declarations: [UserDetailListPage]
})
export class UserDetailListPageModule {}
