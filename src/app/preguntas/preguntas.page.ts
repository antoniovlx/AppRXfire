import { Component, OnInit, ViewChild } from '@angular/core';
// import Swiper core and required modules
import { AppService } from '../services/app.service';
import { IonContent } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { EstimacionesPatronesRepository } from '../repositories/EstimacionesPatronesRepository';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  data: { longitudLlama: number; velocidadPropagacion: number; };

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}
