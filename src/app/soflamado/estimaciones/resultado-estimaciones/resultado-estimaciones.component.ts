import { Component, Input, OnInit } from '@angular/core';
import { ResultadosPatrones } from 'src/app/patrones/patrones.service';
import { ResultadoSoflamado } from '../../soflamado.service';

@Component({
  selector: 'resultado-estimaciones',
  templateUrl: './resultado-estimaciones.component.html',
  styleUrls: ['./resultado-estimaciones.component.scss'],
})
export class ResultadoEstimacionesComponent implements OnInit {
  @Input()
  resultados: ResultadoSoflamado;

  constructor() { }

  ngOnInit() { }

}
