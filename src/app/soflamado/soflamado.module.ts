import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoflamadoPageRoutingModule } from './soflamado-routing.module';

import { SoflamadoPage } from './soflamado.page';
import { SharedModule } from '../shared/shared.module';
import { EstimacionesPage } from './estimaciones/estimaciones.page';
import { EstimacionesPageModule } from './estimaciones/estimaciones.module';
import { HistorialPage } from './historial/historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoflamadoPageRoutingModule,
    SharedModule, 
    EstimacionesPageModule
  ],
  declarations: [SoflamadoPage]
})
export class SoflamadoPageModule {}
