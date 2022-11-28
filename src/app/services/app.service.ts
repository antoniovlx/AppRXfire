import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private platform: Platform) { }

  public isMobile() {
    return this.platform.is('mobile');
  }

  public isElectron(){
    return this.platform.is('electron');
  }
}
