import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HistorialData, PatronesService, ResultadosPatrones } from '../../patrones.service';

@Component({
  selector: 'app-ver-registro',
  templateUrl: './ver-registro.component.html',
  styleUrls: ['./ver-registro.component.scss'],
})
export class VerRegistroComponent implements OnInit {
  registro: HistorialData;
  resultado: ResultadosPatrones;

  data = [];

  constructor(private modalController: ModalController, private patronesService: PatronesService) {

  }

  ngOnInit(): void {
    this.resultado = this.patronesService.getResultadosPatrones();
    this.patronesService.createResultadosFromPatronesEstimado(this.resultado, this.registro.resultadosEstimado);
    this.patronesService.createResultadosFromPatronesObservado(this.resultado, this.registro.resultadosObservado);
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.data, 'confirm');
  }

}
