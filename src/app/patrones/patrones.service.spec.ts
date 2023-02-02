import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { PatronesData, PatronesService, ResultadosPatrones, TipoResultado } from './patrones.service';

const PATRONES_DATA: PatronesData = {
  distanciaLineasEncendido: 1.5,
  velocidadViento2m: 4,
  cargaTotalDisponible: 15,
  cargaCombustibleFinoMuerto: 10,
  numeroLineasEncendido: {
    valor: '2',
    ponderaLongitudLlama: 1,
    ponderaVelocidadPropagacion: 1
  },
  distanciaFajas: {
    valor: '1.5',
    ponderaLongitudLlama: 1,
    ponderaVelocidadPropagacion: 1
  },
  numeroFajas: {
    valor: '2',
    ponderaLongitudLlama: 1,
    ponderaVelocidadPropagacion: 1
  },
  distanciaHorizontalPuntos: {
    valor: '0.5',
    ponderaLongitudLlama: 0.9,
    ponderaVelocidadPropagacion: 0.95
  },
  velocidadPropagacionObservada: 2,
  longitudLlamaObservada: 5,

}

describe('PatronesService', () => {
  let service: PatronesService;
  let resultados: ResultadosPatrones;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TranslateService] });
    service = TestBed.inject(PatronesService);

    service.patronesData = PATRONES_DATA;
    resultados = service.resultadosPatrones;
  });

  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Mediante método estimado', () => {
    beforeEach(() => {
      service.calcularPatrones(TipoResultado.FAJAS, service.getResultadosPatrones().estimado);
    });

    it('calcular en fajas', () => {
      const velocidadPropagacion = resultados.estimado.fajas.velocidadPropagacion;
      const longitudLlama = resultados.estimado.fajas.longitudLlama;
  
      expect(parseFloat(velocidadPropagacion.toFixed(3))).toBe(1.57);
      expect(parseFloat(longitudLlama.toFixed(3))).toBe(1.553); 
    });
  
    it('calcular en flancos', () => {
      service.calcularPatrones(TipoResultado.FLANCOS, service.getResultadosPatrones().estimado);
      const velocidadPropagacion = resultados.estimado.flancos.velocidadPropagacion;
      const longitudLlama = resultados.estimado.flancos.longitudLlama;
  
      expect(parseFloat(velocidadPropagacion.toFixed(3))).toBe(0.738);
      expect(parseFloat(longitudLlama.toFixed(3))).toBe(1.087); 
    });

    it('calcular en puntos', () => {
      service.calcularPatrones(TipoResultado.PUNTOS, service.getResultadosPatrones().estimado);
      const velocidadPropagacion = resultados.estimado.puntos.velocidadPropagacion;
      const longitudLlama = resultados.estimado.puntos.longitudLlama;

      expect(parseFloat(velocidadPropagacion.toFixed(3))).toBe(1.491);
      expect(parseFloat(longitudLlama.toFixed(3))).toBe(1.398); 
    });
  });

  describe('Mediante método observado', () => {
    beforeEach(() => {
      service.calcularPatrones(TipoResultado.FAJAS, service.getResultadosPatrones().observado);
    });

    it('calcular en fajas', () => {
      const velocidadPropagacion = resultados.observado.fajas.velocidadPropagacion;
      const longitudLlama = resultados.observado.fajas.longitudLlama;
  
      expect(parseFloat(velocidadPropagacion.toFixed(3))).toBe(2);
      expect(parseFloat(longitudLlama.toFixed(3))).toBe(5); 
    });
  
    it('calcular en flancos', () => {
      service.calcularPatrones(TipoResultado.FLANCOS, service.getResultadosPatrones().observado);
      const velocidadPropagacion = resultados.observado.flancos.velocidadPropagacion;
      const longitudLlama = resultados.observado.flancos.longitudLlama;
  
      expect(parseFloat(velocidadPropagacion.toFixed(3))).toBe(0.94);
      expect(parseFloat(longitudLlama.toFixed(3))).toBe(3.5); 
    });

    it('calcular en puntos', () => {
      service.calcularPatrones(TipoResultado.PUNTOS, service.getResultadosPatrones().observado);
      const velocidadPropagacion = resultados.observado.puntos.velocidadPropagacion;
      const longitudLlama = resultados.observado.puntos.longitudLlama;

      expect(parseFloat(velocidadPropagacion.toFixed(3))).toBe(1.9);
      expect(parseFloat(longitudLlama.toFixed(3))).toBe(4.5); 
    });
  });
});
