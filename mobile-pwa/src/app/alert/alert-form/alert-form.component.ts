import { Component, Input, OnInit } from '@angular/core';
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
  @Input() alertObj;

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
    if (this.alertObj) {
      this.setValueForm();
    }
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

  setValueForm() {
    this.alertForm.get('name').setValue(this.alertObj.name);
    this.alertForm.get('email').setValue(this.alertObj.email);
    this.alertForm.get('geocode').setValue(this.alertObj.geocode);
    this.alertForm.get('frequency').setValue(this.alertObj.frequency);
    this.alertForm.get('minCases').setValue(this.alertObj.minCases);
    this.alertForm.get('name').disable();
    this.alertForm.get('email').disable();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    if (this.alertForm.valid) {
      this.showLoading();
      if (this.alertObj) {
        this.edit();
      } else {
        this.create();
      }

    }

  }


  edit(){
    this.alertService.updateAlert(this.alertObj._id,this.alertForm.value).subscribe(() => {
      this.closeLoading();
      this.presentToastEdit();
      this.alertObj = undefined;
      return this.modalCtrl.dismiss('confirm');
    }, (error) => {
      console.log(error);
      this.closeLoading();
    })
  }

  create(){
    this.alertService.createAlert(this.alertForm.value).subscribe(() => {
      this.closeLoading();
      this.presentToastCreate();
      return this.modalCtrl.dismiss('confirm');
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });

    loading.present();
  }

  closeLoading() {
    this.loadingCtrl.dismiss();
  }

  async presentToastCreate() {
    const toast = await this.toastController.create({
      message: 'Alerta criado com sucesso!!',
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }

  async presentToastEdit() {
    const toast = await this.toastController.create({
      message: 'Alerta atualizado com sucesso!!',
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }

}
