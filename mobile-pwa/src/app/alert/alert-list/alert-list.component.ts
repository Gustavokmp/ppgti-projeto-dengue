import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertFormComponent } from '../alert-form/alert-form.component';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
})
export class AlertListComponent {

  @Input() alerts;
  @Output() reloadList: EventEmitter<any> = new EventEmitter();
  constructor(private modalCtrl: ModalController, private alertService: AlertService,private alertController: AlertController) { }


  async editAlert(alert) {
    const modal = await this.modalCtrl.create({
      component: AlertFormComponent,
      componentProps: { alertObj: alert }
    });
    modal.present();

    await modal.onWillDismiss();
    this.reloadList.emit('reload')
  }

  async removeAlert(alert) {
    const alertCtl = await this.alertController.create({
      header: 'Confirmação',
      message: 'Você tem certeza que deseja remover o alerta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Ação cancelada');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.removeAlertRequest(alert);
          }
        }
      ]
    });

    await alertCtl.present();
  }

  getFrequencyLabel(frequency) {
    return frequency == 'weekly' ? 'Semanal' : "Mensal"
  }

  removeAlertRequest(alert){
    this.alertService.deleteAlert(alert._id).subscribe(()=>{
      this.reloadList.emit('reload')
    },(error)=>{
      console.log(error);
      
    })
  }

}
