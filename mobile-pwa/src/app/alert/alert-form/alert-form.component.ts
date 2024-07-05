import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import paraibaMunicipios from '../../../assets/data/geojs-25-mun.json';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.scss'],
})
export class AlertFormComponent implements OnInit {

  alertForm: FormGroup;
  listCities = [];
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private toastController: ToastController
  ) { }


  ngOnInit(): void {
    this.getListCities()
    this.createForm();
  }


  createForm() {
    this.alertForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      geocode: ['', Validators.required],
      frequency: ['', [Validators.required]],
      minCases: [0, [Validators.required]]
    })

  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    if (this.alertForm.valid) {
      this.showLoading();
      this.alertService.createAlert(this.alertForm.value).subscribe(() => {
        this.closeLoading();
        this.presentToast();
        return this.modalCtrl.dismiss('confirm');
      }, (error) => {
        console.log(error);
        this.closeLoading();
        
      })
    }


  }

  getListCities() {
    paraibaMunicipios.features.forEach((feature: any) => {
      this.listCities.push({
        id: feature.properties.id,
        name: feature.properties.name
      });
    });

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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Alerta criado com sucesso!!',
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }

}
