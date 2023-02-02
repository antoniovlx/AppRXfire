import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatronesData, PatronesService } from '../patrones/patrones.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-soflamado',
  templateUrl: './soflamado.page.html',
  styleUrls: ['./soflamado.page.scss'],
})
export class SoflamadoPage implements OnInit {
  patronesData: PatronesData;

  constructor(public ui: UiService, private router: Router, private patronesService: PatronesService) { }

  ngOnInit() {
    this.patronesData = this.patronesService.getPatronesData();

    if(this.patronesData.intensidad === undefined){
      this.ui.avisoAlert("Aviso", "mensaje altura soflamado", "patrones");
    }
  }

  get pathData(){
    return this.ui.getPathData(this.router.url);
  }

}
