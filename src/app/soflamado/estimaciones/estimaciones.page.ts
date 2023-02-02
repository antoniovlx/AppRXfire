import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
import { ResultadoSoflamado, SoflamadoService } from '../soflamado.service';

@Component({
  selector: 'app-estimaciones',
  templateUrl: './estimaciones.page.html',
  styleUrls: ['./estimaciones.page.scss'],
})
export class EstimacionesPage implements OnInit {
  @ViewChild("content", { static: false })
  content: IonContent;
  
  resultados: ResultadoSoflamado;
  resultadosSaved:  ResultadoSoflamado;

  constructor(public ui: UiService, private soflamadoService: SoflamadoService) { 
  
  }

  ngOnInit() {
    this.resultados = this.soflamadoService.getResultadosSoflamado();

    this.soflamadoService.getResultadosSoflamadoUpdated().subscribe(resultados => {
      this.resultados = resultados;
    })
  }

  ionViewWillEnter(){
    this.soflamadoService.initResultadosSoflamado();
    if(this.resultadosSaved !== undefined){
      this.resultados = this.resultadosSaved;
    }
  }

  ionViewWillLeave(){
    if(this.resultados.isCalculated === true){
      this.resultadosSaved = this.resultados;
    }
  }

  ScrollToTop() {
    this.ui.scrollTop$(this.content);
  }

}
