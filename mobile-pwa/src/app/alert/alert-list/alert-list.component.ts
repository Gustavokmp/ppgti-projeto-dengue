import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
})
export class AlertListComponent {

  @Input() alerts;
  constructor() { }


  editAlert(alert){

  }

  removeAlert(alert){

  }

  getFrequencyLabel(frequency){
    return frequency == 'weekly' ? 'Semanal' : "Mensal"
  }

}
