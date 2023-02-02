import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { EstimacionesPatrones } from 'src/entities/EstimacionesPatrones';
import { EstimacionesPatronesRepository } from '../repositories/EstimacionesPatronesRepository';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private platform: Platform) { }

  public isMobile() {
    return this.platform.is('mobile');
  }

  public isElectron() {
    return this.platform.is('electron');
  }

  public checkEntrada(entrada) {
    if (entrada === undefined || typeof entrada === 'number' && isNaN(entrada))
      return false;

   return true;
  }

}
