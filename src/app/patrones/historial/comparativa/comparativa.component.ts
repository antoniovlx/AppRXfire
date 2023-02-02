import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { TableClass } from 'src/app/shared/tableClass';
import { HistorialData } from '../../patrones.service';

@Component({
  selector: 'app-comparativa',
  templateUrl: './comparativa.component.html',
  styleUrls: ['./comparativa.component.scss'],
})
export class ComparativaComponent extends TableClass implements OnInit {
  estimaciones: HistorialData[];

  data = [];

  constructor(private modalController: ModalController, private translate: TranslateService) {
    super();
  }

  ngOnInit() {
    this.data = this.estimaciones;
   
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.data, 'confirm');
  }
}
