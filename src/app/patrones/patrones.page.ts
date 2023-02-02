import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AppService } from '../services/app.service';
import { UiService } from '../services/ui.service';
import { distanciaHorizontalPuntos, DistanciaPuntos, LineasEncendido, lineasEncendido } from '../shared/model/modelData';

@Component({
  selector: 'patrones',
  templateUrl: './patrones.page.html',
  styleUrls: ['./patrones.page.scss'],
})
export class PatronesPage{


  constructor(private ui: UiService, private router: Router){}
  
  get pathData() {
    return this.ui.getPathData(this.router.url);
  }

 
}
