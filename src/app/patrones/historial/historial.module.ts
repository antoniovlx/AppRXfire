import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPageRoutingModule } from './historial-routing.module';

import { HistorialPage } from './historial.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComparativaComponent } from './comparativa/comparativa.component';
import { VerRegistroComponent } from './ver-registro/ver-registro.component';
import { EstimacionesPageModule } from '../estimaciones/estimaciones.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HistorialPageRoutingModule,
    EstimacionesPageModule
  ],
  declarations: [HistorialPage, ComparativaComponent, VerRegistroComponent]
})
export class HistorialPageModule { }
