import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertFormComponent } from '../alert/alert-form/alert-form.component';
import { AlertService } from '../service/alert.service';
import paraibaMunicipios from '../../assets/data/geojs-25-mun.json';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  email: string;
  listCities = [];
  listAlerts = [];

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertService: AlertService
  ) {

  }

  ionViewWillEnter() {
    this.getListCities();
  }


  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AlertFormComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);

    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });

    loading.present();
  }

  closeLoading() {
    this.loadingCtrl.dismiss();
  }

  getAlertsByEmail() {
    this.showLoading();
    this.alertService.getAlerts(this.email).subscribe((data) => {
      this.closeLoading();
      this.listAlerts = data.map(item => ({
        ...item,
        cityname: this.listCities.filter((city) => city.id == item.geocode)[0].name
      }));

    }, (error) => {
      console.log(error);
      this.closeLoading();
    })
  }

  getListCities() {
    paraibaMunicipios.features.forEach((feature: any) => {
      this.listCities.push({
        id: feature.properties.id,
        name: feature.properties.name
      });
    });

  }

}
