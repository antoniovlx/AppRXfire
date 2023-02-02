import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { PatronesData, PatronesService } from 'src/app/patrones/patrones.service';
import { AppService } from 'src/app/services/app.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilService } from 'src/app/services/util.service';
import { LineasEncendido, lineasEncendido, distanciaHorizontalPuntos, DistanciaPuntos, temperaturaAire } from 'src/app/shared/model/modelData';
import { SoflamadoData, SoflamadoService } from '../soflamado.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.page.html',
  styleUrls: ['./entradas.page.scss'],
})
export class EntradasPage implements OnInit {
  soflamadoData: SoflamadoData;

  patronesData: PatronesData;

  existenHuecos: any;
  localizacionHuecos: any;
  distanciaHuecos: any;
  temperatura: any;
  alturaArbolado: any;
  alturaPrimeraRama: any;

  @ViewChild("content", { static: false })
  content: IonContent;

  messageCheckEntradas: string;

  constructor(public ui: UiService, private patronesService: PatronesService, private soflamadoService: SoflamadoService, private utilService: UtilService) { }

  async ngOnInit() {
    this.soflamadoData = this.soflamadoService.getSoflamadoData();

    this.existenHuecos = 'no';

    this.messageCheckEntradas = await this.utilService.getTranslate("Faltan campos obligatorios");
  }

  updateExistenHuecos(existenHuecos) {
    this.existenHuecos = existenHuecos;
    this.soflamadoData.hayHuecos = this.existenHuecos === 'si' ? true : false;
  }

  updateTemperatura(valor: any) {
    this.temperatura = valor;
    this.soflamadoData.temperatura = parseFloat(valor);
  }

  updateAlturaPrimeraRama(valor: any) {
    this.alturaPrimeraRama = valor;
    this.soflamadoData.alturaPrimeraRama = parseFloat(valor);
  }

  updateAlturaArbolado(valor: any) {
    this.alturaArbolado = valor;
    this.soflamadoData.alturaArbolado = parseFloat(valor);
  }

  updateLocalizacionHuecos(valor: any) {
    this.localizacionHuecos = valor;
    this.soflamadoData.localizacionHuecos = parseInt(valor);
  }

  updateDistanciaHuecos(valor: any) {
    this.distanciaHuecos = valor;
    this.soflamadoData.distanciaHuecos = parseFloat(valor);
  }

  estimar() {
    this.soflamadoService.calcularSoflamado();

    this.soflamadoService.resultadosSoflamadoUpdated();
  }

  isDisabledEstimacion(){
    if(this.temperatura !== undefined && 
      this.temperatura !== '' && this.alturaArbolado !== undefined &&
      this.alturaArbolado !== '' && this.alturaPrimeraRama !== undefined &&
      this.alturaPrimeraRama !== '' && (this.existenHuecos && 
      this.localizacionHuecos !== undefined && this.distanciaHuecos !== undefined 
      && this.distanciaHuecos !== '' || !this.existenHuecos)){
      return false;
    }

    return true;
  }

  ScrollToTop() {
    this.ui.scrollTop$(this.content);
  }

}
