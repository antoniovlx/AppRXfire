import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatronesPage } from './patrones.page';


const routes: Routes = [
  {
    path: '',
    component: PatronesPage,
    data: { breadcrumb: 'Velocidad propagación y longitud llama', imagePath: './assets/img/recursos-naturales.png' },
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
        redirectTo: '/patrones/entradas',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: '/patrones/entradas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatronesPageRoutingModule {}
