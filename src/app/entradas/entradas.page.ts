import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IonContent, IonSelect } from '@ionic/angular';

import { firstValueFrom, of } from 'rxjs';
import { AppService } from '../services/app.service';
import { CalculosService } from '../services/calculos.service';
import { UiService } from '../services/ui.service';


@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.page.html',
  styleUrls: ['./entradas.page.scss'],
})
export class EntradasPage implements OnInit {
  modelos = [];

  @ViewChild("modelo1", { static: false })
  modelo1Select: IonSelect

  @ViewChild("content", { static: false })
  content: IonContent;
  constructor(private uiService: UiService) {

  }
  ngOnInit() {
    this.uiService.onTopScrolled(this.content);
  }
}
