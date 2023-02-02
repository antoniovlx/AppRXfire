import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { estimateDFMC } from 'dfmc-wildfire-calculator';
import { appPages } from '../app-routing.module';
import { AppService } from '../services/app.service';
import { UiService } from '../services/ui.service';
import { horasolar, horasprevision } from '../shared/model/modelData';

@Component({
  selector: 'app-dfmc',
  templateUrl: './dfmc.page.html',
  styleUrls: ['./dfmc.page.scss'],
})
export class DfmcPage implements OnInit {
  humedadRelativaSelected: any;
  pendienteSelected: any;
  horaprevisionSelected: any;
  horasolarSelected: any;
  temperaturaAireSelected: any;

  mesPrevisionSelected: string;
  sueloSelected: any;
  exposicionSelected: any;

  pendiente: number;
  hfmResult: number = 0;

  @ViewChild("content", { static: false }) content: IonContent;

  constructor(public ui: UiService, private router: Router) {

  }

  ngOnInit() {

  }

  get pathData() {
    return this.ui.getPathData(this.router.url);
  }


  get horasprevision() {
    return horasprevision;
  }

  get horasolar() {
    return horasolar;
  }

  updateHoraprevisionSelected(hora) {
    this.horaprevisionSelected = hora;
    this.calculate();
  }

  updateHorasolarSelected(hora: string) {
    this.horasolarSelected = hora;
    this.calculate();
  }

  updateMesPrevisionSelected(mes: string) {
    this.mesPrevisionSelected = mes;
    this.calculate();
  }

  updateTemperaturaAireSelected(temperatura) {
    this.temperaturaAireSelected = (temperatura !== '') ? parseFloat(temperatura): temperatura;
    
    this.calculate();
  }

  updateSueloSelected(suelo: string) {
    this.sueloSelected = suelo;

    if(suelo === 'Shaded'){
      this.pendienteSelected = 0;
    }else{
      this.pendienteSelected = undefined;
    }
  }

  updateHumedadRelativaSelected(humedad) {
    if(humedad !== ''){
      this.humedadRelativaSelected = parseFloat(humedad);
    }else{
      this.humedadRelativaSelected = humedad;
    }
    this.calculate();
  }

  updatePendienteSelected(pendiente) {
    this.pendienteSelected = pendiente;

    if(this.pendienteSelected === '0-30'){
      this.pendiente = 15;
    }else if(this.pendienteSelected === '>30'){
      this.pendiente = 35;
    }else{
      this.pendiente = 0;
    }
    
    this.calculate();
  }

  updateExposicionSelected(exposicion) {
    this.exposicionSelected = exposicion;
    this.calculate();
  }


  isDisabledEstimation() {
    if(this.horaprevisionSelected !== undefined && this.mesPrevisionSelected !== undefined
      && this.horasolarSelected !== undefined
      && this.temperaturaAireSelected !== undefined && this.temperaturaAireSelected !== ''
      && this.humedadRelativaSelected !== undefined && this.humedadRelativaSelected !== ''
      && this.sueloSelected !== undefined
      && this.exposicionSelected !== undefined
      && this.pendienteSelected !== undefined ){
      return false;
    }else{
      return true;
    }
  }

  calculate() {
    if(!this.isDisabledEstimation()){
      this.hfmResult = estimateDFMC(this.horaprevisionSelected.hora, parseInt(this.mesPrevisionSelected), this.horasolarSelected, this.temperaturaAireSelected, this.humedadRelativaSelected, this.sueloSelected, this.pendiente, this.exposicionSelected);
    }else{
      this.hfmResult = 0;
    }
  }

  ScrollToTop() {
    this.ui.scrollTop$(this.content);
  }
}
