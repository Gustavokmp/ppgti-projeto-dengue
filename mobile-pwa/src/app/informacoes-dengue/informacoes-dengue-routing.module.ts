import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacoesDenguePage } from './informacoes-dengue.page';

const routes: Routes = [
  {
    path: '',
    component: InformacoesDenguePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacoesDenguePageRoutingModule {}
