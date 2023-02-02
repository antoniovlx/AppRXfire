import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DfmcPage } from './dfmc.page';

const routes: Routes = [
  {
    path: '',
    component: DfmcPage,
    data: { breadcrumb: 'Estimar HFM', imagePath: './assets/img/recursos-naturales.png' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DfmcPageRoutingModule {}
