import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, ReplaySubject, Subject } from 'rxjs';
import { appPages } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private loader: HTMLIonLoadingElement;
  private loaderLoading = false;
  private selectTab$ = new Subject<string>();

  constructor(private loadingController: LoadingController, public toastController: ToastController,
    private translate: TranslateService, private alertController: AlertController, private router: Router) {

  }


  public async presentLoading(message: string) {
    message = await firstValueFrom(this.translate.get(message));
    this.loaderLoading = true;
    this.loader = await this.loadingController.create({
      message: message,
      showBackdrop: true
    });

    this.loader.present().then(() => { this.loaderLoading = false; });
  }

  public dismissLoading() {
    const interval = setInterval(() => {
      if (this.loader || !this.loaderLoading) {
        this.loader.dismiss().then(() => { this.loader = null; clearInterval(interval) });
      } else if (!this.loader && !this.loaderLoading) {
        clearInterval(interval);
      }
    }, 500);
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getPathData(url) {
    let index = appPages.findIndex(page => url.startsWith(page.url));
    return { title: appPages[index].title, imagePath: appPages[index].img };
  }


  private checkEntradas(entradas) {
    for (const key in entradas) {
      if (entradas[key] === undefined)
        return false;

      if (typeof entradas[key] === 'number' && isNaN(entradas[key]))
        return false;
    }
    return true;
  }

  public loaderDismissed(loader) {
    return loader.onDidDismiss();
  }


  selectTab(title: string) {
    this.selectTab$.next(title);
  }

  getSelectTab() {
    return this.selectTab$.asObservable();
  }

  presentToast(message: string) {
    this.translate.get(message).subscribe(async (res: string) => {
      const toast = await this.toastController.create({
        message: res,
        color: "primary",
        icon: 'information-circle',
        position: 'top',
        cssClass: 'toast-message',
        duration: 3000,
        buttons: [
          {
            text: "OK"
          }
        ]
      });
      toast.present();
    });

  }

  async presentAlertToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      color: "danger",
      duration: 4000,
      position: 'top',
      icon: 'alert-circle-outline',
      cssClass: 'toast-message',
      /*buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]*/

    });
    toast.present();
  }

  async confirmationAlert(titulo: string, message: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    let translations = [];
    translations = await firstValueFrom(this.translate.get([titulo, message, 'Si']));

    const alert = await this.alertController.create({
      header: translations['Confirmación'],
      message: translations['¿Desea CONTINUAR y eliminar los elementos seleccionados?'],
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          handler: () => resolveFunction(false)
        },
        {
          text: translations['Si'],
          handler: () => resolveFunction(true)
        }
      ]
    });
    await alert.present();
    return promise;
  }

  async avisoAlert(titulo: string, message: string, path?: string): Promise<boolean> {
    titulo = await firstValueFrom(this.translate.get(titulo));
    message = await firstValueFrom(this.translate.get(message));
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      header: titulo,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => path !== undefined ? this.router.navigate([path]) : this.router.navigate([location.pathname])
        }
      ]
    });
    await alert.present();
    return promise;
  }

  scrollTop$(content: IonContent) {
    content.scrollToTop(1500);
  }

  async createMessageAviso(datos: string[]) {
    let mensaje = await firstValueFrom(this.translate.get('Antes de continuar debe introducir:'));
    mensaje += "<ul>"
    for (let index = 0; index < datos.length; index++) {
      let dato = datos[index];
      mensaje += "<li>"
      dato = await firstValueFrom(this.translate.get(dato));
      mensaje += dato;
      mensaje += "</li>"
    }
    mensaje += "</ul>"
    return mensaje;
  }
}
