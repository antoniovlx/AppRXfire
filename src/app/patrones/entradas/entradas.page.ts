import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { AppService } from 'src/app/services/app.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilService } from 'src/app/services/util.service';
import { LineasEncendido, lineasEncendido, distanciaHorizontalPuntos, DistanciaPuntos, distanciaEntreFajas } from 'src/app/shared/model/modelData';
import { PatronesService, PatronesData, TipoResultado, Metodo } from '../patrones.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.page.html',
  styleUrls: ['./entradas.page.scss'],
})
export class EntradasPage implements OnInit {
  patronesData: PatronesData;

  distanciaLineas: any;
  distanciaFajas: DistanciaPuntos;
  velocidadViento: any;
  cargaTotal: any;
  numeroLineas: LineasEncendido;
  numeroFajas: LineasEncendido;
  distanciaHorizontalPuntos: DistanciaPuntos;
  cargaFinoMuerto: any;

  isEstimado: boolean;
  isObservado: boolean;
  isFajas: boolean;
  isFlancos: boolean;
  isPuntos: boolean;

  velocidadPropagacion: any;
  longitudLlama: any;

  messageCheckEntradas: string;

  @ViewChild("content", { static: false })
  content: IonContent

  constructor(public ui: UiService, private patronesService: PatronesService) { }

  ngOnInit() {
    this.patronesData = this.patronesService.getPatronesData();
  }

  get lineasEncendido() {
    return lineasEncendido;
  }

  get distanciasPuntos() {
    return distanciaHorizontalPuntos;
  }

  get distanciaEntreFajas() {
    return distanciaEntreFajas;
  }

  ningunMetodoSeleccionado(): boolean {
    return (!this.isEstimado
      && !this.isObservado)
      || (this.isObservado && this.velocidadPropagacion === '' || this.longitudLlama === '')
  }

  updateDistanciaLineas(valor: any) {
    this.distanciaLineas = valor;
    this.patronesData.distanciaLineasEncendido = parseFloat(valor);
  }

  updateDistanciaFajas(distancia: DistanciaPuntos) {
    this.distanciaFajas = distancia;
    this.patronesData.distanciaFajas = distancia;
  }

  updateVelocidadViento(valor: any) {
    this.velocidadViento = valor;
    this.patronesData.velocidadViento2m = parseFloat(valor);
  }

  updateCargaTotal(valor: any) {
    this.cargaTotal = valor;
    this.patronesData.cargaTotalDisponible = parseFloat(valor);
  }

  updateDistanciaPuntos(distancia: DistanciaPuntos) {
    this.distanciaHorizontalPuntos = distancia;
    this.patronesData.distanciaHorizontalPuntos = distancia;
  }

  updateCargaFinoMuerto(valor: any) {
    this.cargaFinoMuerto = valor;
    this.patronesData.cargaCombustibleFinoMuerto = parseFloat(valor);
  }

  updateNumeroLineas(linea: LineasEncendido) {
    this.numeroLineas = linea;
    this.patronesData.numeroLineasEncendido = linea;
  }

  updateNumeroFajas(linea: LineasEncendido) {
    this.numeroFajas = linea;
    this.patronesData.numeroFajas = linea;
  }

  updateVelocidadPropagacion(valor: any) {
    this.velocidadPropagacion = valor;
    this.patronesData.velocidadPropagacionObservada = parseFloat(valor);
  }

  updateLongitudLlama(valor: any) {
    this.longitudLlama = valor;
    this.patronesData.longitudLlamaObservada = parseFloat(valor);
  }

  updateIsObservado(valor: boolean) {
    this.isObservado = valor;
  }

  updateIsEstimado(valor: boolean) {
    this.isEstimado = valor;
  }

  updateIsFajas(valor: boolean) {
    this.isFajas = valor;
  }

  updateIsFlancos(valor: boolean) {
    this.isFlancos = valor;
  }

  updateIsPuntos(valor: boolean) {
    this.isPuntos = valor;
  }

  isDisabledEstimation() {
    let isDisabled = true;

    if (this.velocidadViento !== undefined && this.velocidadViento !== ''
      && this.cargaTotal !== undefined && this.cargaTotal !== '' &&
      this.cargaFinoMuerto !== undefined && this.cargaFinoMuerto !== ''
      && this.numeroLineas !== undefined && this.distanciaLineas !== undefined
      && this.distanciaLineas !== '' &&
      this.isDisabledEstimadoObservado()
      && this.isDisabledCalculos()) {
      isDisabled = false;
    } else {
      isDisabled = true;
    }

    return isDisabled;
  }

  isDisabledCalculos(): boolean {
    if (this.isPuntos) {
      if (this.distanciaHorizontalPuntos !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return (this.isDisabledFajas() && this.isFlancos && !this.isDisabledPuntos()) ||
        (this.isDisabledFajas() && !this.isFlancos && !this.isDisabledPuntos()) ||
        (!this.isDisabledFajas() && this.isFlancos && !this.isDisabledPuntos())
    }
  }

  isDisabledPuntos(): boolean {
    return this.isPuntos && this.distanciaHorizontalPuntos !== undefined;
  }

  isDisabledFajas(): boolean {
    return (this.isEstimado && !this.isObservado && this.isFajas)
      || (this.isFajas && this.isObservado &&
        this.numeroFajas !== undefined &&
        this.distanciaFajas !== undefined);
  }

  isDisabledEstimadoObservado(): boolean {
    return (this.isEstimado && !this.isObservado) ||
      ((!this.isEstimado && this.isObservado || this.isEstimado && this.isObservado) && this.velocidadPropagacion !== undefined && this.velocidadPropagacion !== ''
        && this.longitudLlama !== undefined && this.longitudLlama !== '');
  }

  async estimar() {

    if (this.isEstimado) {
      this.calcularMetodoEstimado();
    }

    if (this.isObservado) {
      this.calcularMetodoObservado();
    }

    this.patronesService.resultadosPatronesUpdated();

    //await this.ui.presentAlertToast(this.messageCheckEntradas);
  }


  private calcularMetodoObservado() {
    this.patronesService.calcularPatrones(TipoResultado.FAJAS, this.patronesService.getResultadosPatrones().observado);

    if (this.isFlancos) {
      this.patronesService.calcularPatrones(TipoResultado.FLANCOS, this.patronesService.getResultadosPatrones().observado);
    }

    if (this.isPuntos) {
      this.patronesService.calcularPatrones(TipoResultado.PUNTOS, this.patronesService.getResultadosPatrones().observado);
    }
  }

  private calcularMetodoEstimado() {
    this.patronesService.calcularPatrones(TipoResultado.FAJAS, this.patronesService.getResultadosPatrones().estimado);

    if (this.isFlancos) {
      this.patronesService.calcularPatrones(TipoResultado.FLANCOS, this.patronesService.getResultadosPatrones().estimado);
    }

    if (this.isPuntos) {
      this.patronesService.calcularPatrones(TipoResultado.PUNTOS, this.patronesService.getResultadosPatrones().estimado);
    }
  }

  ScrollToTop() {
    this.ui.scrollTop$(this.content);
  }


}
