import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MapaParaibaComponentModule } from '../mapa-paraiba/mapa-paraiba.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TotalCasosModule } from '../total-casos/total-casos.module';
import { GraficoLinhaTemporalModule } from '../grafico-linha-temporal/grafico-linha-temporal.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MapaParaibaComponentModule,
    LeafletModule,
    Tab1PageRoutingModule,
    TotalCasosModule,
    GraficoLinhaTemporalModule,

  ],
  declarations: [Tab1Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1PageModule {}


