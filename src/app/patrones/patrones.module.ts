import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatronesPageRoutingModule } from './patrones-routing.module';

import { PatronesPage } from './patrones.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatronesPageRoutingModule,
    SharedModule
  ],
  declarations: [PatronesPage]
})
export class PatronesPageModule {}
