import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertFormComponent } from './alert-form/alert-form.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AlertFormComponent, AlertListComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AlertFormComponent, AlertListComponent]
})
export class AlertModule { }
