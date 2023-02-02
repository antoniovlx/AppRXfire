import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimacionesPageRoutingModule } from './estimaciones-routing.module';

import { EstimacionesPage } from './estimaciones.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultadoEstimacionesComponent } from './resultado-estimaciones/resultado-estimaciones.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EstimacionesPageRoutingModule
  ],
  exports: [ResultadoEstimacionesComponent],
  declarations: [EstimacionesPage, ResultadoEstimacionesComponent]
})
export class EstimacionesPageModule {}
