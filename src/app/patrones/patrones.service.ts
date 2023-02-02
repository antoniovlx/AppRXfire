import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { EstimacionesEstimado } from 'src/entities/EstimacionesEstimado';
import { EstimacionesObservado } from 'src/entities/EstimacionesObservado';
import { EstimacionesPatrones } from 'src/entities/EstimacionesPatrones';
import { EstimacionesPatronesRepository } from '../repositories/EstimacionesPatronesRepository';
import { UiService } from '../services/ui.service';
import { DistanciaPuntos, LineasEncendido } from '../shared/model/modelData';


export class PatronesData {
  distanciaLineasEncendido: number;
  distanciaFajas: DistanciaPuntos;
  velocidadViento2m: number;
  cargaTotalDisponible: number;
  cargaCombustibleFinoMuerto: number;
  distanciaHorizontalPuntos: DistanciaPuntos;
  numeroLineasEncendido: LineasEncendido;
  numeroFajas: LineasEncendido;
  velocidadPropagacionObservada: number;
  longitudLlamaObservada: number;
  intensidad: number;
}

interface CalcularPatrones {
  estimarFajas();
  estimarFlancos();
  estimarPuntos();
}

interface Resultado {
  velocidadPropagacion: number;
  longitudLlama: number;
}

class ResultadoFajas implements Resultado {
  velocidadPropagacion: number;
  longitudLlama: number;
}

class ResultadosPuntos implements Resultado {
  velocidadPropagacion: number;
  longitudLlama: number;
}

class ResultadosFlancos implements Resultado {
  velocidadPropagacion: number;
  longitudLlama: number;
}

export class MetodoEstimado implements CalcularPatrones {
  data: PatronesData;
  fajas: Resultado;
  flancos: Resultado;
  puntos: Resultado;

  constructor() {
    this.fajas = new ResultadoFajas();
    this.flancos = new ResultadosFlancos();
    this.puntos = new ResultadosPuntos();
  }

  estimarFajas() {
    const vp = 0.23 * Math.pow(this.data.velocidadViento2m, 0.816) * Math.exp(this.data.distanciaLineasEncendido * 0.193 + 0.05 * this.data.cargaCombustibleFinoMuerto);
    this.data.intensidad = 18500 * this.data.cargaTotalDisponible * vp / 600;
    const longitudLlama = 0.075 * Math.pow(this.data.intensidad, 0.46)

    this.fajas.velocidadPropagacion = vp * this.data.numeroLineasEncendido.ponderaVelocidadPropagacion;
    this.fajas.longitudLlama = longitudLlama * this.data.numeroLineasEncendido.ponderaLongitudLlama;
  }

  estimarFlancos() {
    this.flancos.velocidadPropagacion = this.fajas.velocidadPropagacion * 0.47;
    this.flancos.longitudLlama = this.fajas.longitudLlama * 0.7;

  }
  estimarPuntos() {
    this.puntos.velocidadPropagacion = this.fajas.velocidadPropagacion * this.data.distanciaHorizontalPuntos.ponderaVelocidadPropagacion;
    this.puntos.longitudLlama = this.fajas.longitudLlama * this.data.distanciaHorizontalPuntos.ponderaLongitudLlama;
  }
}

export class MetodoObservado implements CalcularPatrones {
  data: PatronesData;
  fajas: Resultado;
  flancos: Resultado;
  puntos: Resultado;

  constructor() {
    this.fajas = new ResultadoFajas();
    this.flancos = new ResultadosFlancos();
    this.puntos = new ResultadosPuntos();
  }

  estimarFajas() {
    const vp = this.data.velocidadPropagacionObservada * this.data.distanciaFajas.ponderaVelocidadPropagacion;
    const Ll = this.data.longitudLlamaObservada * this.data.distanciaFajas.ponderaLongitudLlama;

    this.fajas.velocidadPropagacion = vp * this.data.numeroFajas.ponderaVelocidadPropagacion;
    this.fajas.longitudLlama = Ll * this.data.numeroFajas.ponderaLongitudLlama;
  }

  estimarFlancos() {
    this.flancos.velocidadPropagacion = this.fajas.velocidadPropagacion * 0.47;
    this.flancos.longitudLlama = this.fajas.longitudLlama * 0.7;
  }

  estimarPuntos() {
    this.puntos.velocidadPropagacion = this.fajas.velocidadPropagacion * this.data.distanciaHorizontalPuntos.ponderaVelocidadPropagacion;
    this.puntos.longitudLlama = this.fajas.longitudLlama * this.data.distanciaHorizontalPuntos.ponderaLongitudLlama;
  }
}

export interface ResultadosPatrones {
  estimado: MetodoEstimado;
  observado: MetodoObservado;
  isCalculated: boolean;
}

export interface HistorialData {
  id: string;
  fecha: string;
  velocidadViento: number;
  cargaTotal: number;
  cargaCombustibleFinoMuerto: number;
  numeroLineasEncendido: number;
  distanciaLineasEncendido: number;
  resultadosEstimado: EstimacionesEstimado;
  resultadosObservado: EstimacionesObservado;
}

export enum Metodo {
  ESTIMADO, OBSERVADO
}

export enum TipoResultado {
  FAJAS, FLANCOS, PUNTOS
}

@Injectable({
  providedIn: 'root'
})
export class PatronesService {
  resultados$ = new Subject<ResultadosPatrones>();
  patronesData: PatronesData;
  resultadosPatrones: ResultadosPatrones;

  toSave: boolean = false;

  constructor(private patronesRepository: EstimacionesPatronesRepository, private uiService: UiService) {
    this.patronesData = new PatronesData();
    this.initResultadosPatrones();
  }

  getPatronesData() {
    return this.patronesData;
  }

   getResultadosPatrones() {
    return this.resultadosPatrones;
  }

  initResultadosPatrones() {
    this.resultadosPatrones = {
      estimado: new MetodoEstimado(),
      observado: new MetodoObservado(),
      isCalculated: false
    }
  }

  getResultadosPatronesUpdated(): Observable<ResultadosPatrones> {
    return this.resultados$.asObservable();
  }

  resultadosPatronesUpdated() {
    this.saveResultadoPatrones(this.resultadosPatrones).subscribe(saved => {
      this.uiService.presentToast("mensaje guardado");
      this.resultados$.next(this.resultadosPatrones);
    })
  }

  getAllEstimacionesPatrones() {
    return this.patronesRepository.getEstimacionesPatrones();
  }

  getEstimacionesPatronesByDate(date){
    return this.patronesRepository.getEstimacionesPatronesByDate(date);
  }

  deleteEstimacionPatrones(estimacion: EstimacionesPatrones) {
    return this.patronesRepository.deleteEstimacionesPatrones(estimacion.id);
  }

  calcularPatrones(tipoResultado: TipoResultado, metodo: CalcularPatrones) {
    this.resultadosPatrones.estimado.data = this.patronesData;
    this.resultadosPatrones.observado.data = this.patronesData;
    this.resultadosPatrones.isCalculated = true;

    switch (tipoResultado) {
      case TipoResultado.FAJAS:
        metodo.estimarFajas();
        break;
      case TipoResultado.FLANCOS:
        metodo.estimarFlancos();
        break;
      case TipoResultado.PUNTOS:
        metodo.estimarPuntos();
        break;
      default:
        break;
    }
    //this.setResultadosPatrones(this.resultadosPatrones);
  }

  saveResultadoPatrones(resultados: ResultadosPatrones) {
    let patrones = new EstimacionesPatrones();
    patrones.fecha = new Date().toISOString();
    patrones.velocidadViento = this.patronesData.velocidadViento2m;
    patrones.cargaTotal = this.patronesData.cargaTotalDisponible;
    patrones.cargaCombustibleFinoMuerto = this.patronesData.cargaCombustibleFinoMuerto;
    patrones.distanciaLineasEncendido = this.patronesData.distanciaLineasEncendido;
    patrones.numeroLineasEncendido = parseInt(this.patronesData.numeroLineasEncendido.valor);

    this.createPatronesEstimadoFromResultados(patrones, resultados);
    this.createPatronesObservadoFromResultados(patrones, resultados);

    return this.patronesRepository.saveOrUpdatePatrones(patrones);
  }

  private createPatronesEstimadoFromResultados(patrones: EstimacionesPatrones, resultados: ResultadosPatrones) {
    patrones.estimado.velocidadPropagacionFajas = resultados.estimado.fajas.velocidadPropagacion;
    patrones.estimado.longitudLlamaFajas = resultados.estimado.fajas.longitudLlama;
    patrones.estimado.velocidadPropagacionFlancos = resultados.estimado.flancos.velocidadPropagacion;
    patrones.estimado.longitudLlamaFlancos = resultados.estimado.flancos.longitudLlama;
    patrones.estimado.velocidadPropagacionPuntos = resultados.estimado.puntos.velocidadPropagacion;
    patrones.estimado.longitudLlamaPuntos = resultados.estimado.puntos.longitudLlama;
  }

  private createPatronesObservadoFromResultados(patrones: EstimacionesPatrones, resultados: ResultadosPatrones) {
    patrones.observado.velocidadPropagacionFajas = resultados.observado.fajas.velocidadPropagacion;
    patrones.observado.longitudLlamaFajas = resultados.observado.fajas.longitudLlama;
    patrones.observado.velocidadPropagacionFlancos = resultados.observado.flancos.velocidadPropagacion;
    patrones.observado.longitudLlamaFlancos = resultados.observado.flancos.longitudLlama;
    patrones.observado.velocidadPropagacionPuntos = resultados.observado.puntos.velocidadPropagacion;
    patrones.observado.longitudLlamaPuntos = resultados.observado.puntos.longitudLlama;
  }

  public createResultadosFromPatronesEstimado(resultados: ResultadosPatrones, estimado: EstimacionesEstimado) {
    resultados.estimado.fajas.velocidadPropagacion = estimado.velocidadPropagacionFajas;
    resultados.estimado.fajas.longitudLlama = estimado.longitudLlamaFajas;
    resultados.estimado.flancos.velocidadPropagacion = estimado.velocidadPropagacionFlancos;
    resultados.estimado.flancos.longitudLlama = estimado.longitudLlamaFlancos;
    resultados.estimado.puntos.velocidadPropagacion = estimado.velocidadPropagacionPuntos;
    resultados.estimado.puntos.longitudLlama = estimado.longitudLlamaPuntos;
  }

  public createResultadosFromPatronesObservado(resultados: ResultadosPatrones, observado: EstimacionesObservado) {
    resultados.observado.fajas.velocidadPropagacion = observado.velocidadPropagacionFajas;
    resultados.observado.fajas.longitudLlama = observado.longitudLlamaFajas;
    resultados.observado.flancos.velocidadPropagacion = observado.velocidadPropagacionFlancos;
    resultados.observado.flancos.longitudLlama = observado.longitudLlamaFlancos;
    resultados.observado.puntos.velocidadPropagacion = observado.velocidadPropagacionPuntos;
    resultados.observado.puntos.longitudLlama = observado.longitudLlamaPuntos;
  }
}
