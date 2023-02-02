import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimacionesPage } from './estimaciones.page';

const routes: Routes = [
  {
    path: '',
    component: EstimacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimacionesPageRoutingModule {}
