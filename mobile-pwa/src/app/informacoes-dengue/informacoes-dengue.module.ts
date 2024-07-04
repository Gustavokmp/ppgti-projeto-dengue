// informacoes-dengue.module.ts
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformacoesDenguePage } from './informacoes-dengue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [InformacoesDenguePage],
  exports: [InformacoesDenguePage]
})
export class InformacoesDenguePageModule {}
