import { Component, Input, OnInit } from '@angular/core';
import { PatronesData, PatronesService, ResultadosPatrones } from '../../patrones.service';

@Component({
  selector: 'resultado-estimaciones',
  templateUrl: './resultado-estimaciones.component.html',
  styleUrls: ['./resultado-estimaciones.component.scss'],
})
export class ResultadoEstimacionesComponent implements OnInit {

  @Input()
  resultados: ResultadosPatrones;

  constructor() { }

  ngOnInit() {

  }

}
