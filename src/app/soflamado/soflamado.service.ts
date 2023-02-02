import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EstimacionesSoflamado } from 'src/entities/EstimacionesSoflamado';
import { PatronesData, PatronesService } from '../patrones/patrones.service';
import { EstimacionesSoflamadoRepository } from '../repositories/EstimacionesSoflamadoRepository';
import { UiService } from '../services/ui.service';

export class SoflamadoData {
  temperatura: number;
  alturaArbolado: number;
  alturaPrimeraRama: number;
  hayHuecos: boolean = false;
  localizacionHuecos: LocalizacionHuecos;
  distanciaHuecos: number;
}

export class ResultadoSoflamado {
  alturaSoflamadoMedia: string;
  volumenCopaSoflamado: string;
  alturaSoflamadoHueco: string;
  isCalculated: boolean;
}

export enum LocalizacionHuecos {
  SUPERIOR, OTRAS
}


@Injectable({
  providedIn: 'root'
})
export class SoflamadoService {

  resultados$ = new Subject<ResultadoSoflamado>();
  soflamadoData: SoflamadoData;
  patronesData: PatronesData;
  resultadosSoflamado: ResultadoSoflamado;

  toSave: boolean = false;

  constructor(private uiService: UiService, private patronesService: PatronesService, private soflamadoRepository: EstimacionesSoflamadoRepository) {
    this.soflamadoData = new SoflamadoData();
    this.patronesData = this.patronesService.getPatronesData();
    this.initResultadosSoflamado();
  }

  getSoflamadoData() {
    return this.soflamadoData;
  }

  getResultadosSoflamado() {
    return this.resultadosSoflamado;
  }

  initResultadosSoflamado() {
    this.resultadosSoflamado = new ResultadoSoflamado();
  }

  getResultadosSoflamadoUpdated(): Observable<ResultadoSoflamado> {
    return this.resultados$.asObservable();
  }

  resultadosSoflamadoUpdated() {
    this.saveResultadoSoflamado(this.resultadosSoflamado).subscribe(saved => {
      this.uiService.presentToast("mensaje guardado");
      this.resultados$.next(this.resultadosSoflamado);
    })
  }

  getAllEstimacionesSoflamado() {
    return this.soflamadoRepository.getEstimacionesSoflamado();
  }

  getEstimacionesSoflamadoByDate(date) {
    return this.soflamadoRepository.getEstimacionesSoflamadoByDate(date);
  }

  deleteEstimacionSoflamado(estimacion) {
    return this.soflamadoRepository.deleteEstimacionesSoflamado(estimacion.id);
  }

  saveResultadoSoflamado(resultados: ResultadoSoflamado) {
    let patrones = new EstimacionesSoflamado();
    patrones.fecha = new Date().toISOString();
    patrones.temperatura = this.soflamadoData.temperatura;
    patrones.alturaArbolado = this.soflamadoData.alturaArbolado;
    patrones.alturaRama = this.soflamadoData.alturaPrimeraRama;
    patrones.existenHuecos = this.soflamadoData.hayHuecos.toString();
    patrones.distanciaHuecos = this.soflamadoData.distanciaHuecos.toString();
    patrones.localizacionHuecos = this.soflamadoData.localizacionHuecos.toString();

    patrones.alturaSoflamadoMedia = resultados.alturaSoflamadoMedia;
    patrones.volumenSoflamado = resultados.volumenCopaSoflamado;
    patrones.alturaSoflamadoHueco = resultados.alturaSoflamadoHueco;

    return this.soflamadoRepository.saveOrUpdateSoflamado(patrones);
  }

  calcularSoflamado() {
    const alturaSoflamadoMedia = this.calcularSoflamadoMedia();

    this.calcularVolumenSoflamado(alturaSoflamadoMedia);

    if (this.soflamadoData.hayHuecos === true) {
      switch (this.soflamadoData.localizacionHuecos) {
        case LocalizacionHuecos.SUPERIOR:
          this.resultadosSoflamado.alturaSoflamadoHueco = this.calcularAlturaSoflamadoHuecosSuperior();
          break;
        case LocalizacionHuecos.OTRAS:
          this.resultadosSoflamado.alturaSoflamadoHueco = this.calcularAlturaSoflamadoHuecosOtras();
          break;
      }
    }
  }

  calcularAlturaSoflamadoHuecosSuperior() {
    let incremento = 0;

    if (this.soflamadoData.distanciaHuecos >= 5.3 && this.soflamadoData.distanciaHuecos <= 10) {
      incremento = 6.822 * Math.log(this.soflamadoData.distanciaHuecos) - 10.36;
    } else if (this.soflamadoData.distanciaHuecos > 10) {
      incremento = 6.5;
    }

    return this.incrementarIntervalo(this.resultadosSoflamado.alturaSoflamadoMedia, incremento);
  }

  calcularAlturaSoflamadoHuecosOtras() {
    let incremento = 0;
    
    if (this.soflamadoData.distanciaHuecos >= 8) {
      incremento = 1.595 * Math.log(this.soflamadoData.distanciaHuecos) - 2.278;
    } 
      
    return this.incrementarIntervalo(this.resultadosSoflamado.alturaSoflamadoMedia, incremento);
  }

  calcularSoflamadoMedia() {
    this.patronesData.intensidad = 259;

    const alturaSoflamadoMedia = 0.072 * Math.pow(this.patronesData.intensidad, 0.437) * Math.pow(this.soflamadoData.temperatura, 0.501) * Math.pow(this.soflamadoData.alturaPrimeraRama, 0.102);

    this.resultadosSoflamado.alturaSoflamadoMedia = this.calcularIntervalo(alturaSoflamadoMedia);

    return alturaSoflamadoMedia;
  }

  calcularVolumenSoflamado(alturaSoflamadoMedia) {
    const longitudCopa = this.soflamadoData.alturaArbolado - this.soflamadoData.alturaPrimeraRama;
    const longitudCopaSoflamada = alturaSoflamadoMedia - this.soflamadoData.alturaPrimeraRama;

    if (longitudCopaSoflamada >= 0) {
      const volumenCopaSoflamado = (longitudCopaSoflamada / longitudCopa) * 100;

      this.resultadosSoflamado.volumenCopaSoflamado = this.calcularIntervalo(volumenCopaSoflamado);
    } else {
      this.resultadosSoflamado.volumenCopaSoflamado = "0-2";
    }
  }

  calcularIntervalo(valor: number) {
    let limInferior = valor - (valor * 0.05);
    let limSuperior = valor + (valor * 0.05);

    if(limInferior < 0){
      limInferior = 0;
    }

    return `${limInferior.toFixed(1)}-${limSuperior.toFixed(1)}`;
  }

  incrementarIntervalo(intervalo: string, incremento: number) {
    return `${(parseFloat(intervalo.split('-')[0]) + incremento).toFixed(1)}-${(parseFloat(intervalo.split('-')[1]) + incremento).toFixed(1)}`;
  }
}

