import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const appPages = [
  { title: 'Créditos', url: 'about', icon: 'warning', img: './assets/img/question.png' },
  { title: 'HFM', url: '/dfmc', icon: 'calculator', img: './assets/img/hoja.png' },
  { title: 'Patrones', url: '/patrones', icon: 'calculator', img: './assets/img/comportamiento_fuego.png' },
  { title: 'Altura de soflamado', url: '/soflamado', icon: 'calculator', img: './assets/img/soflamado.png' },
  /*{ title: '4º Pantalla', url: '/dfmc', icon: 'calculator', img: './assets/img/resources.png' },*/
]
; 


const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'dfmc',
    loadChildren: () => import('./dfmc/dfmc.module').then( m => m.DfmcPageModule)
  },
  {
    path: 'patrones',
    loadChildren: () => import('./patrones/patrones.module').then( m => m.PatronesPageModule)
  },
  {
    path: 'soflamado',
    loadChildren: () => import('./soflamado/soflamado.module').then( m => m.SoflamadoPageModule)
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
