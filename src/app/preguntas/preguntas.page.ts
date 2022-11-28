import { Component, OnInit, ViewChild } from '@angular/core';
// import Swiper core and required modules
import { AppService } from '../services/app.service';
import { IonContent } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { TcrRepository } from '../repositories/TcrRepository';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  data: { longitudLlama: number; velocidadPropagacion: number; };

  constructor(private uiService: UiService, private repository: TcrRepository) { }

  ngOnInit() {
    this.uiService.onTopScrolled(this.content);
    this.repository.getVelocidadPropagacionAndLongitudLlama("1", 15, 9, 0)
    .subscribe(data => {
      this.data = data;
    })

  }

  ngAfterViewInit() {

  }
}
