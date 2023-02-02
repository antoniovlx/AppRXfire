import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TituloApartadoComponent } from './components/titulo-apartado/titulo-apartado.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { MaterialModule } from './material.module';
import { UiService } from '../services/ui.service';

@NgModule({
  declarations: [BreadcrumbComponent, LoadingComponent, TituloApartadoComponent, ResultadosComponent],
  imports: [
    TranslateModule.forChild({
      //missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
      useDefaultLang: false,
    }),
    IonicModule,
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    TranslateModule,
    BreadcrumbComponent,
    TituloApartadoComponent, LoadingComponent, ResultadosComponent, MaterialModule
  ],
  providers: [
    TranslateService,
    UiService
  ]
})
export class SharedModule { }
