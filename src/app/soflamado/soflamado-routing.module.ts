import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoflamadoPage } from './soflamado.page';

const routes: Routes = [
  {
    path: '',
    component: SoflamadoPage,
    data: { breadcrumb: 'Altura de soflamado', imagePath: './assets/img/recursos-naturales.png' },
    children: [
      {
        path: 'entradas',
        loadChildren: () => import('./entradas/entradas.module').then(m => m.EntradasPageModule)
      },
      {
        path: 'estimaciones',
        loadChildren: () => import('./estimaciones/estimaciones.module').then(m => m.EstimacionesPageModule)
      },
      {
        path: 'historial',
        loadChildren: () => import('./historial/historial.module').then(m => m.HistorialPageModule)
      },
      {
        path: '',
        redirectTo: '/soflamado/entradas',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: '/soflamado/entradas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoflamadoPageRoutingModule {}
