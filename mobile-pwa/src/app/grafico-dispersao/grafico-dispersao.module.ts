import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoDispersaoComponent } from './grafico-dispersao.component';



@NgModule({
  declarations: [GraficoDispersaoComponent],
  imports: [
    CommonModule
  ],
  exports:[GraficoDispersaoComponent]
})
export class GraficoDispersaoModule { }
