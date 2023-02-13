import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Interface } from 'readline';
import { AppService } from 'src/app/services/app.service';
import { UiService } from 'src/app/services/ui.service';
import { EstimacionesPatrones } from 'src/entities/EstimacionesPatrones';
import { Metodo, MetodoEstimado, PatronesData, PatronesService, ResultadosPatrones, TipoResultado } from '../patrones.service';


@Component({
  selector: 'estimaciones',
  templateUrl: './estimaciones.page.html',
  styleUrls: ['./estimaciones.page.scss'],
})
export class EstimacionesPage implements OnInit{
  @ViewChild("content", {static: false})
  content: IonContent

  velocidadPropagacion: any;
  longitudLlama: any;
  resultados: ResultadosPatrones;
  resultadosSaved: ResultadosPatrones;

  constructor(public ui: UiService, private patronesService: PatronesService) { 
    
  }

  ngOnInit() {
    this.resultados = this.patronesService.getResultadosPatrones();

    this.patronesService.getResultadosPatronesUpdated().subscribe(resultados => {
      this.resultados = resultados;
      console.log(this.resultados)
    })
  }

  ionViewWillEnter(){
    this.patronesService.initResultadosPatrones();
    if(this.resultadosSaved !== undefined &&  this.resultados === this.resultadosSaved){
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
