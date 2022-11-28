import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  @ViewChild(IonContent, { static: false })
  content: IonContent;

  isMobile: boolean;
  loader: HTMLIonLoadingElement;
  loaderLoading: boolean;

  constructor(private uiService: UiService) { }

  ngOnInit() {
    this.uiService.onTopScrolled(this.content);
  }

  async exportData() {
    this.uiService.presentLoading("Exportando...");
    // export data and download
    this.uiService.dismissLoading();
  }
}
