import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DfmcPageRoutingModule } from './dfmc-routing.module';

import { DfmcPage } from './dfmc.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    DfmcPageRoutingModule,
    SharedModule
  ],
  declarations: [DfmcPage]
})
export class DfmcPageModule {}
